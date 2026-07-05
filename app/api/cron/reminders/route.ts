import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendReminderEmail, sendReplayEmail } from "@/lib/resend";
import { EVENT, REMINDER_SCHEDULE } from "@/lib/constants";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * GET /api/cron/reminders
 *
 * Triggered on a schedule (see vercel.json → "crons", set to run
 * every 5 minutes). For each reminder milestone in
 * REMINDER_SCHEDULE, finds registrations that (a) have crossed that
 * threshold and (b) haven't already received that specific reminder
 * (tracked via the `reminder_sends` unique constraint), then sends
 * and records it.
 *
 * Protected by CRON_SECRET — Vercel Cron automatically sends this
 * as a Bearer token when the env var is set; for any other
 * scheduler (e.g. cron-job.org on Render), configure it to send
 * `Authorization: Bearer $CRON_SECRET` as a header.
 *
 * NOTE: this endpoint is written and structured correctly per
 * Vercel Cron + Supabase conventions, but has not been exercised
 * against a live schedule in this environment — verify timing
 * against EVENT.startISO after deploying, and consider Upstash
 * QStash if you need sub-minute precision or retries with backoff.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "database_unavailable" }, { status: 503 });
  }

  const eventStart = new Date(EVENT.startISO).getTime();
  const now = Date.now();
  const results: Record<string, number> = {};

  // ── Scheduled reminders (7d / 3d / 24h / 1h / 15m before) ──────
  for (const milestone of REMINDER_SCHEDULE) {
    const triggerAt = eventStart - milestone.offsetMs;
    if (now < triggerAt) continue; // not time yet
    if (now > eventStart) continue; // event already started, handled by replay logic instead

    const { data: candidates, error } = await supabase
      .from("registrations")
      .select("id, email, first_name, zoom_join_url")
      .eq("event_slug", EVENT.slug);

    if (error || !candidates) continue;

    let sentCount = 0;
    for (const reg of candidates) {
      const { data: alreadySent } = await supabase
        .from("reminder_sends")
        .select("id")
        .eq("registration_id", reg.id)
        .eq("reminder_type", milestone.type)
        .maybeSingle();

      if (alreadySent) continue;

      const joinUrl = reg.zoom_join_url || process.env.ZOOM_STATIC_JOIN_URL || "";
      const emailResult = await sendReminderEmail(
        reg.email,
        reg.first_name,
        joinUrl,
        milestone.label
      );

      if (emailResult.ok) {
        await supabase
          .from("reminder_sends")
          .insert({ registration_id: reg.id, reminder_type: milestone.type });
        await supabase.from("activity_log").insert({
          registration_id: reg.id,
          event_type: "reminder_sent",
          metadata: { type: milestone.type },
        });
        sentCount += 1;
      }
    }
    results[milestone.type] = sentCount;
  }

  // ── Replay email (48h after event start, once) ─────────────────
  const replayTriggerAt = eventStart + 48 * 60 * 60 * 1000;
  if (now >= replayTriggerAt) {
    const { data: candidates } = await supabase
      .from("registrations")
      .select("id, email, first_name")
      .eq("event_slug", EVENT.slug);

    let replaySent = 0;
    for (const reg of candidates ?? []) {
      const { data: alreadySent } = await supabase
        .from("reminder_sends")
        .select("id")
        .eq("registration_id", reg.id)
        .eq("reminder_type", "replay")
        .maybeSingle();
      if (alreadySent) continue;

      const replayUrl = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/webinar/replay`
        : "#";
      const result = await sendReplayEmail(reg.email, reg.first_name, replayUrl);
      if (result.ok) {
        await supabase
          .from("reminder_sends")
          .insert({ registration_id: reg.id, reminder_type: "replay" });
        replaySent += 1;
      }
    }
    results.replay = replaySent;
  }

  return NextResponse.json({ ok: true, results, checkedAt: new Date().toISOString() });
}

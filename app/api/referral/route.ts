import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { LeaderboardEntry } from "@/types";

export const runtime = "nodejs";
export const revalidate = 60; // cache for 60s at the edge/CDN layer

/**
 * GET /api/referral
 * Returns the top 20 referrers from the `referral_leaderboard` view
 * (see supabase/schema.sql) — aggregated and PII-safe (first name +
 * last initial only) since this is displayed publicly.
 */
export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json<{ ok: boolean; entries: LeaderboardEntry[] }>({
      ok: false,
      entries: [],
    });
  }

  const { data, error } = await supabase
    .from("referral_leaderboard")
    .select("*")
    .limit(20);

  if (error) {
    console.error("[api/referral] query failed:", error);
    return NextResponse.json({ ok: false, entries: [] }, { status: 500 });
  }

  return NextResponse.json({ ok: true, entries: data ?? [] });
}

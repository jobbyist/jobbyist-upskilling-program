import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateWebinarICS } from "@/lib/ics";

export const runtime = "nodejs";

/**
 * GET /api/ics/[id]
 * Streams a .ics calendar file for a given registration ID.
 * Falls back to the static Zoom URL if the registration can't be
 * found, so a stale/shared link still produces a usable file.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getSupabaseAdmin();
  let joinUrl = process.env.ZOOM_STATIC_JOIN_URL || "https://zoom.us/j/0000000000";

  if (supabase) {
    const { data } = await supabase
      .from("registrations")
      .select("zoom_join_url")
      .eq("id", params.id)
      .maybeSingle();
    if (data?.zoom_join_url) joinUrl = data.zoom_join_url;
  }

  const result = generateWebinarICS(joinUrl);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return new NextResponse(result.value, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jobbyist-webinar.ics"',
      "Cache-Control": "no-store",
    },
  });
}

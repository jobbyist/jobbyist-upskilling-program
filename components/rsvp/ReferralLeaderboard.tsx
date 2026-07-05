"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { LeaderboardEntry } from "@/types";

/**
 * Fetches the public, aggregated referral leaderboard (see
 * app/api/referral/route.ts + the `referral_leaderboard` SQL view)
 * and shows the top 5. Fails silently to nothing if Supabase isn't
 * configured yet — this is a bonus gamification touch, not
 * load-bearing for the registration flow itself.
 */
export default function ReferralLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/referral")
      .then((res) => res.json())
      .then((data: { ok: boolean; entries: LeaderboardEntry[] }) => {
        if (!cancelled && data.ok) setEntries(data.entries);
      })
      .catch(() => {
        if (!cancelled) setEntries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!entries || entries.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-sm rounded-xl2 border border-charcoal-line-strong bg-charcoal-raised p-4 text-left">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-electric-soft">
        <Icon name="trophy" className="h-4 w-4" /> Top referrers so far
      </p>
      <ol className="flex flex-col gap-2">
        {entries.slice(0, 5).map((entry, i) => (
          <li key={entry.referrer_code} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-mid">
              <span className="font-mono text-xs text-ink-faint">#{i + 1}</span>
              {entry.display_name}
            </span>
            <span className="font-mono text-xs text-electric-soft">
              {entry.referral_count} {entry.referral_count === 1 ? "referral" : "referrals"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

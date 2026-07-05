"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { buildCalendarLinks } from "@/lib/ics";
import { EVENT } from "@/lib/constants";
import ReferralLeaderboard from "./ReferralLeaderboard";
import type { RsvpApiResponse } from "@/types";

export default function ConfirmationScreen({
  result,
  firstName,
}: {
  result: RsvpApiResponse;
  firstName: string;
}) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const duration = 2200;
    const end = Date.now() + duration;
    const colors = ["#3B5BFF", "#7C93FF", "#F5F6F8"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const calendarLinks = result.joinUrl ? buildCalendarLinks(result.joinUrl) : null;

  function handleShare() {
    const shareData = {
      title: EVENT.name,
      text: `I just registered for ${EVENT.name} — join me!`,
      url: result.referralUrl || EVENT.host.eventsUrl,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else if (result.referralUrl) {
      navigator.clipboard?.writeText(result.referralUrl);
      alert("Invite link copied to clipboard!");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-electric-dim">
        <Icon name="check" className="h-9 w-9 text-electric-soft" strokeWidth={2.4} />
      </div>

      <h3 className="font-heading text-2xl font-extrabold text-ink">
        You're in, {firstName}! 🎉
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-mid">
        Your seat for <strong className="text-ink">{EVENT.name}</strong> is confirmed. Check
        your inbox for your Zoom link and calendar invite.
      </p>

      {result.registrationCode && (
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal-raised px-4 py-2 font-mono text-xs text-ink-mid">
          Registration ID: <span className="text-electric-soft">{result.registrationCode}</span>
        </div>
      )}

      {result.qrCodeDataUrl && (
        <div className="mx-auto mt-6 w-fit rounded-2xl bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.qrCodeDataUrl} alt="Registration QR code" width={140} height={140} />
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {calendarLinks && (
          <>
            <Button as="a" href={calendarLinks.google} target="_blank" variant="outline" size="sm">
              <Icon name="calendar" className="h-4 w-4" /> Google
            </Button>
            <Button as="a" href={calendarLinks.outlook} target="_blank" variant="outline" size="sm">
              <Icon name="calendar" className="h-4 w-4" /> Outlook
            </Button>
          </>
        )}
        {result.icsUrl && (
          <Button as="a" href={result.icsUrl} download variant="outline" size="sm">
            <Icon name="download" className="h-4 w-4" /> .ics File
          </Button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={handleShare} variant="ghost" size="md">
          <Icon name="share" className="h-4 w-4" /> Share Event
        </Button>
        {result.joinUrl && (
          <Button as="a" href={result.joinUrl} target="_blank" size="md">
            View Zoom Link
          </Button>
        )}
      </div>

      {result.referralUrl && (
        <div className="mx-auto mt-8 max-w-sm rounded-xl2 border border-charcoal-line-strong bg-charcoal-raised p-4 text-left">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-electric-soft">
            Invite friends, earn entries
          </p>
          <p className="text-xs text-ink-mid">
            Every friend who registers with your link earns you a bonus entry in the prize draw.
          </p>
          <div className="mt-2 truncate rounded-lg bg-charcoal px-3 py-2 font-mono text-xs text-ink-mid">
            {result.referralUrl}
          </div>
        </div>
      )}

      <ReferralLeaderboard />
    </motion.div>
  );
}

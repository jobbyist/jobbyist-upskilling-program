"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EVENT } from "@/lib/constants";

/**
 * Speaker teaser + a lightweight standalone notification signup
 * (separate from the main RSVP — this just captures an email via
 * the same /api/rsvp-adjacent flow isn't wired to avoid duplicate
 * registrations; instead it POSTs to /api/rsvp with a minimal
 * payload tagged so it can be filtered/segmented in HubSpot later
 * via referralSource). For simplicity and to avoid a second
 * database table, this demo version just confirms client-side —
 * wire it to your own lightweight endpoint if you want it tracked
 * separately from full webinar registrations.
 */
export default function GuestSpeaker() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="section-pad relative bg-charcoal-soft">
      <div className="container-page max-w-2xl">
        <RevealOnScroll>
          <GlassCard strong className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-charcoal-raised">
              <Icon name="users" className="h-8 w-8 text-ink-faint" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-electric-soft">
              {EVENT.speaker.announced ? "Confirmed Speaker" : "Coming Soon"}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-ink md:text-3xl">
              {EVENT.speaker.placeholderHeadline}
            </h2>
            <p className="mt-3 text-sm text-ink-mid">
              Be the first to know when our special guest is revealed — we'll email you the
              moment it's announced.
            </p>

            {submitted ? (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-dim px-4 py-2 text-sm font-semibold text-electric-soft">
                <Icon name="check" className="h-4 w-4" /> You'll be the first to know!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl border border-charcoal-line-strong bg-charcoal-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-electric focus:outline-none"
                />
                <Button size="md">Notify Me</Button>
              </form>
            )}
          </GlassCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}

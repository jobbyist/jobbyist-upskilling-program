"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import MeshGradient from "@/components/ui/MeshGradient";
import { EVENT } from "@/lib/constants";

export default function FinalCTA() {
  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : EVENT.host.eventsUrl;
    if (navigator.share) {
      navigator.share({ title: EVENT.name, text: EVENT.description, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <section className="section-pad relative overflow-hidden">
      <MeshGradient />
      <div className="container-page relative max-w-2xl text-center">
        <RevealOnScroll>
          <h2 className="font-heading text-4xl font-extrabold text-ink md:text-5xl">
            Reserve Your Free Seat Today
          </h2>
          <p className="mt-4 text-ink-mid">
            {EVENT.displayDate} &middot; {EVENT.displayTime} &middot; {EVENT.platform}. Free to
            attend, limited seats, prizes for everyone who shows up.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="a" href="#rsvp" size="lg">
              Register Now <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" onClick={handleShare}>
              <Icon name="share" className="h-4 w-4" /> Share Event
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

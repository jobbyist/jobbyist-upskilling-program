import type { Metadata } from "next";
import { EVENT } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import MeshGradient from "@/components/ui/MeshGradient";

export const metadata: Metadata = {
  title: `Replay | ${EVENT.name}`,
};

/**
 * Replay landing page, linked from the post-event "replay is ready"
 * email (see lib/resend.ts → sendReplayEmail). Swap the placeholder
 * below for an embedded Zoom cloud recording or YouTube unlisted
 * video once the session has aired.
 */
export default function ReplayPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <MeshGradient />
      <div className="relative w-full max-w-2xl text-center">
        <GlassCard strong>
          <h1 className="font-heading text-2xl font-extrabold text-ink">
            The replay will appear here
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-mid">
            Once {EVENT.name} has aired, this page will host the full session replay.
            Embed your Zoom cloud recording or YouTube video here after the event.
          </p>
          <div className="mx-auto mt-6 flex aspect-video max-w-lg items-center justify-center rounded-xl2 border border-dashed border-charcoal-line-strong bg-charcoal-raised text-sm text-ink-faint">
            Video embed placeholder
          </div>
        </GlassCard>
      </div>
    </main>
  );
}

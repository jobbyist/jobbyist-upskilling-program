import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildCalendarLinks } from "@/lib/ics";
import { EVENT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import GlassCard from "@/components/ui/GlassCard";
import MeshGradient from "@/components/ui/MeshGradient";

export const metadata: Metadata = {
  title: `Registration Confirmed | ${EVENT.name}`,
  robots: { index: false, follow: false }, // personal confirmation pages shouldn't be indexed
};

interface PageProps {
  params: { code: string };
}

/**
 * Server-rendered lookup page — this is what the QR code in the
 * confirmation email/screen points to. Looks up the registration
 * by its public `registration_code` (not the internal UUID) using
 * the service-role client, since this route intentionally exposes
 * a read the anon key isn't allowed to perform directly.
 */
export default async function ConfirmedPage({ params }: PageProps) {
  const supabase = getSupabaseAdmin();
  if (!supabase) notFound();

  const { data: registration } = await supabase
    .from("registrations")
    .select("first_name, registration_code, zoom_join_url")
    .eq("registration_code", params.code)
    .maybeSingle();

  if (!registration) notFound();

  const joinUrl = registration.zoom_join_url || process.env.ZOOM_STATIC_JOIN_URL || "#";
  const calendarLinks = buildCalendarLinks(joinUrl);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <MeshGradient />
      <div className="relative w-full max-w-md">
        <GlassCard strong className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-electric-dim">
            <Icon name="check" className="h-7 w-7 text-electric-soft" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-ink">
            You're confirmed, {registration.first_name}!
          </h1>
          <p className="mt-2 text-sm text-ink-mid">
            {EVENT.name} &middot; {EVENT.displayDate} &middot; {EVENT.displayTime}
          </p>
          <p className="mt-4 font-mono text-xs text-ink-faint">
            {registration.registration_code}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button as="a" href={calendarLinks.google} target="_blank" variant="outline" size="sm">
              <Icon name="calendar" className="h-4 w-4" /> Google
            </Button>
            <Button as="a" href={calendarLinks.outlook} target="_blank" variant="outline" size="sm">
              <Icon name="calendar" className="h-4 w-4" /> Outlook
            </Button>
          </div>

          <Button as="a" href={joinUrl} target="_blank" size="md" className="mt-4 w-full">
            Join on Zoom
          </Button>

          <a href="/" className="mt-6 inline-block text-xs text-ink-faint hover:text-ink">
            &larr; Back to event page
          </a>
        </GlassCard>
      </div>
    </main>
  );
}

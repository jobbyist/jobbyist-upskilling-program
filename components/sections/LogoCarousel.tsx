import { LOGO_CAROUSEL } from "@/lib/constants";

/**
 * CSS-driven infinite marquee (no JS animation loop needed — see
 * the `animate-marquee` keyframe in tailwind.config.ts). The list
 * is duplicated once so the loop is seamless.
 */
export default function LogoCarousel() {
  const items = [...LOGO_CAROUSEL, ...LOGO_CAROUSEL];

  return (
    <section className="relative overflow-hidden border-y border-charcoal-line bg-charcoal-soft py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-ink-faint">
        Tools &amp; platforms our attendees use every day
      </p>
      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-charcoal-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-charcoal-soft to-transparent" />
        <div className="flex min-w-max animate-marquee items-center gap-16 motion-reduce:animate-none">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-heading text-xl font-bold text-ink-faint grayscale transition-all duration-300 hover:text-electric-soft hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

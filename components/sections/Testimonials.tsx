import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Icon } from "@/components/ui/Icon";

// Placeholder testimonials — swap for real attendee quotes after
// Episode 1 airs. Keeping names generic/first-name-only until you
// have consent to publish full details.
const TESTIMONIALS = [
  {
    quote:
      "Jobbyist's webinars are the only career events I actually block time for. Practical, no fluff, and I walked away with three CV changes that got me interviews.",
    name: "Lerato M.",
    role: "Marketing Coordinator, Johannesburg",
  },
  {
    quote:
      "I went in unemployed and skeptical about 'AI job tools.' Left with a plan, a rewritten LinkedIn profile, and my first freelance client within two weeks.",
    name: "Sipho K.",
    role: "Freelance Designer, Durban",
  },
  {
    quote:
      "The remote work breakdown alone was worth an hour of my evening. Jobbyist clearly understands the South African market, not just imported advice.",
    name: "Amber v.d.W.",
    role: "Customer Success Lead, Cape Town",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad relative">
      <div className="container-page">
        <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            What Attendees Say
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            From past Jobbyist sessions
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl2 border border-charcoal-line bg-charcoal-raised p-7">
                <div className="mb-4 flex gap-0.5 text-electric-soft">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-ink-mid">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-charcoal-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-faint">{t.role}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

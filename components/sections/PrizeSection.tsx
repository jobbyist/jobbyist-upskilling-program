import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { PRIZES } from "@/lib/constants";

export default function PrizeSection() {
  return (
    <section id="prizes" className="section-pad relative">
      <div className="container-page">
        <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            Attend &amp; Win
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            Attend &amp; Win Amazing Prizes
          </h2>
          <p className="mt-4 text-ink-mid">
            Every registrant present at the live prize draw is automatically entered.
            Refer friends for bonus entries.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PRIZES.map((prize, i) => (
            <RevealOnScroll key={prize.id} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-xl2 glass gradient-border p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-electric/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <span className="text-3xl">{prize.emoji}</span>
                <h3 className="mt-4 font-heading text-base font-bold leading-snug text-ink">
                  {prize.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-electric-soft">{prize.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-faint">{prize.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

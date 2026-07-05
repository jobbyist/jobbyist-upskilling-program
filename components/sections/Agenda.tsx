import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { AGENDA } from "@/lib/constants";

export default function Agenda() {
  return (
    <section id="agenda" className="section-pad relative">
      <div className="container-page max-w-3xl">
        <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            Event Agenda
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            85 minutes, fully mapped out
          </h2>
        </RevealOnScroll>

        <div className="relative">
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-charcoal-line"
            aria-hidden="true"
          />
          <ol className="flex flex-col gap-2">
            {AGENDA.map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 0.07}>
                <li className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-electric/30 bg-charcoal-raised text-xs font-bold text-electric-soft">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-electric-soft">
                      {item.time}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink-mid">{item.description}</p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

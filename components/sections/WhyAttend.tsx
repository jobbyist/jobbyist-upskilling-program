import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Icon } from "@/components/ui/Icon";
import { WHY_ATTEND } from "@/lib/constants";

export default function WhyAttend() {
  return (
    <section id="why-attend" className="section-pad relative bg-charcoal-soft">
      <div className="container-page">
        <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            Why Attend
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            Ten reasons to save your seat
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_ATTEND.map((item, i) => (
            <RevealOnScroll key={item.title} delay={(i % 5) * 0.06}>
              <div className="h-full rounded-xl2 border border-charcoal-line bg-charcoal-raised p-6 transition-colors duration-300 hover:border-electric/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-dim text-electric-soft">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold leading-snug text-ink">
                  {item.title}
                </h3>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

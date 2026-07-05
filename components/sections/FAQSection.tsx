"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Icon } from "@/components/ui/Icon";
import { FAQ } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative bg-charcoal-soft">
      <div className="container-page max-w-2xl">
        <RevealOnScroll className="mx-auto mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            FAQ
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            Common questions
          </h2>
        </RevealOnScroll>

        <div className="divide-y divide-charcoal-line overflow-hidden rounded-xl2 border border-charcoal-line bg-charcoal-raised">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-[15px] font-semibold text-ink">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-ink-faint"
                  >
                    <Icon name="chevron-down" className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-mid">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

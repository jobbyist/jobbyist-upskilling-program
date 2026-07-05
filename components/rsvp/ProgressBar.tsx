"use client";

import { motion } from "framer-motion";
import type { FormStep } from "@/types";

const STEPS: Array<{ key: FormStep; label: string }> = [
  { key: "identity", label: "You" },
  { key: "profile", label: "Career" },
  { key: "preferences", label: "Goals" },
  { key: "consent", label: "Consent" },
  { key: "review", label: "Review" },
];

export default function ProgressBar({ current }: { current: FormStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  const pct = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-charcoal-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric to-electric-soft"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((step, i) => (
          <span
            key={step.key}
            className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              i <= currentIndex ? "text-electric-soft" : "text-ink-faint"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}

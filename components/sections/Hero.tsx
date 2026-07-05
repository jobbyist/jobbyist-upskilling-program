"use client";

import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import MeshGradient from "@/components/ui/MeshGradient";
import Countdown from "@/components/sections/Countdown";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EVENT } from "@/lib/constants";

const TRUST_BADGES = ["LinkedIn", "Claude", "Upwork", "Zoom"];

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-16 md:pt-24 pb-20">
      <MeshGradient />
      <ParticlesBackground className="opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" aria-hidden="true" />

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric-dim px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-electric-soft"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric-soft motion-safe:animate-pulse-glow" />
          {EVENT.series} &middot; {EVENT.episode}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-extrabold text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.05] tracking-tight text-ink max-w-4xl"
        >
          South Africa's <span className="text-gradient">Digital Labour Market</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl text-balance text-lg text-ink-mid md:text-xl"
        >
          {EVENT.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-mid"
        >
          <span className="flex items-center gap-2">
            <Icon name="calendar" className="h-4 w-4 text-electric-soft" />
            {EVENT.displayDate}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="clock" className="h-4 w-4 text-electric-soft" />
            {EVENT.displayTime}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="laptop" className="h-4 w-4 text-electric-soft" />
            {EVENT.platform}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button as="a" href="#rsvp" size="lg">
            Reserve My Seat <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          <Button as="a" href="#agenda" size="lg" variant="ghost">
            View Agenda
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-ink-faint">
            Doors open in
          </p>
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <p className="text-xs uppercase tracking-widest text-ink-faint">
            As seen alongside
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70 grayscale">
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="font-heading text-base font-bold text-ink-mid">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}

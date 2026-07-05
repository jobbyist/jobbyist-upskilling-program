"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = new Date(EVENT.startISO).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

const UNITS: Array<{ key: keyof Omit<TimeLeft, "isPast">; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Avoid a server/client mismatch — render nothing until mounted.
  if (!time) {
    return <div className="h-[92px] md:h-[104px]" aria-hidden="true" />;
  }

  if (time.isPast) {
    return (
      <p className="font-heading font-bold text-electric-soft text-lg">
        We're live — join now!
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-4" role="timer" aria-label="Countdown to webinar">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="glass gradient-border flex w-[68px] flex-col items-center rounded-2xl py-3 md:w-20 md:py-4"
        >
          <span className="font-display text-2xl font-semibold tabular-nums text-ink md:text-3xl">
            {String(time[unit.key]).padStart(2, "0")}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-faint">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

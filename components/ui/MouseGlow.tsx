"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the cursor within its parent
 * section. Uses a ref + direct style mutation (not React state) so
 * mouse movement never triggers a re-render.
 */
export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    function handleMove(e: MouseEvent) {
      if (!el) return;
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-electric/[0.07] blur-[90px] transition-transform duration-300 ease-out will-change-transform"
      aria-hidden="true"
    />
  );
}

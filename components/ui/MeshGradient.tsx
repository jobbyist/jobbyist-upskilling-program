"use client";

/**
 * Animated blurred mesh-gradient blobs used as ambient background
 * decoration. Pure CSS (transform + blur), GPU-friendly, and
 * disabled entirely under prefers-reduced-motion via the
 * `motion-safe:` Tailwind variant.
 */
export default function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-electric/25 blur-[110px] motion-safe:animate-float" />
      <div
        className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-electric-soft/15 blur-[100px] motion-safe:animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-electric/15 blur-[90px] motion-safe:animate-float"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}

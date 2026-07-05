import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  strong = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; strong?: boolean }) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-xl2 p-6 md:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-heading font-bold rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none select-none";

const variants = {
  primary:
    "bg-gradient-to-r from-electric to-electric-soft text-charcoal btn-glow hover:brightness-110",
  ghost:
    "glass text-ink hover:bg-white/[0.08] hover:border-white/20",
  outline:
    "border border-white/20 text-ink hover:border-electric-soft hover:bg-electric/10",
  subtle: "bg-charcoal-raised text-ink-mid hover:text-ink hover:bg-white/[0.06]",
};

const sizes = {
  sm: "text-sm px-4 py-2.5",
  md: "text-[15px] px-6 py-3.5",
  lg: "text-base px-8 py-4",
};

interface CommonProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(
  ({ variant = "primary", size = "md", className, children, as, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (as === "a") {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

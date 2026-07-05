"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

export function FieldWrapper({ label, htmlFor, error, optional, children }: FieldWrapperProps) {
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-ink-faint">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClasses =
  "w-full rounded-xl border bg-charcoal-raised px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint transition-colors focus:outline-none";

export function TextInput({
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(
        inputClasses,
        error ? "border-red-400/60" : "border-charcoal-line-strong focus:border-electric",
        className
      )}
      {...props}
    />
  );
}

export function SelectInput({
  error,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={cn(
        inputClasses,
        "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7080%22 stroke-width=%222%22><polyline points=%226,9 12,15 18,9%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10",
        error ? "border-red-400/60" : "border-charcoal-line-strong focus:border-electric",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function CheckboxPill({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        checked
          ? "border-electric bg-electric-dim text-electric-soft"
          : "border-charcoal-line-strong bg-charcoal-raised text-ink-mid hover:border-white/20"
      )}
    >
      {label}
    </button>
  );
}

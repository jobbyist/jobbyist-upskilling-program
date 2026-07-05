"use client";

import { Icon } from "@/components/ui/Icon";
import type { RsvpFormData, FieldErrors } from "./types";

function ConsentRow({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={onChange}
        className="flex w-full items-start gap-3 rounded-xl border border-charcoal-line-strong bg-charcoal-raised p-4 text-left transition-colors hover:border-white/20"
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            checked ? "border-electric bg-electric text-charcoal" : "border-charcoal-line-strong"
          }`}
        >
          {checked && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <span className="text-sm text-ink-mid">{children}</span>
      </button>
      {error && <p className="mt-1.5 pl-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function StepConsent({
  data,
  errors,
  onChange,
}: {
  data: RsvpFormData;
  errors: FieldErrors;
  onChange: (patch: Partial<RsvpFormData>) => void;
}) {
  return (
    <div>
      <h3 className="mb-1 font-heading text-xl font-bold text-ink">Just one more thing</h3>
      <p className="mb-6 text-sm text-ink-mid">Please confirm the following before we reserve your seat.</p>

      <ConsentRow
        checked={data.consentTerms}
        onChange={() => onChange({ consentTerms: !data.consentTerms })}
        error={errors.consentTerms}
      >
        I agree to Jobbyist's{" "}
        <a href="/terms" target="_blank" className="text-electric-soft underline">Terms of Service</a> and{" "}
        <a href="/privacy" target="_blank" className="text-electric-soft underline">Privacy Policy</a>. *
      </ConsentRow>

      <ConsentRow
        checked={data.consentMarketing}
        onChange={() => onChange({ consentMarketing: !data.consentMarketing })}
      >
        Keep me updated on future Jobbyist webinars, career tips, and Jobbyist Pro offers by email.
      </ConsentRow>
    </div>
  );
}

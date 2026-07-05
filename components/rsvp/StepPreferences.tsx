"use client";

import { FieldWrapper, SelectInput, CheckboxPill } from "./FormField";
import { LOOKING_FOR_OPTIONS, REFERRAL_SOURCES } from "@/lib/constants";
import type { RsvpFormData, FieldErrors } from "./types";

export default function StepPreferences({
  data,
  errors,
  onChange,
}: {
  data: RsvpFormData;
  errors: FieldErrors;
  onChange: (patch: Partial<RsvpFormData>) => void;
}) {
  function toggleLookingFor(value: string) {
    const set = new Set(data.lookingFor);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    onChange({ lookingFor: Array.from(set) });
  }

  return (
    <div>
      <h3 className="mb-1 font-heading text-xl font-bold text-ink">What are you looking for?</h3>
      <p className="mb-6 text-sm text-ink-mid">Select all that apply — this helps us follow up with relevant opportunities.</p>

      <FieldWrapper label="I'm interested in" htmlFor="lookingFor" error={errors.lookingFor}>
        <div className="flex flex-wrap gap-2" id="lookingFor">
          {LOOKING_FOR_OPTIONS.map((opt) => (
            <CheckboxPill
              key={opt.value}
              label={opt.label}
              checked={data.lookingFor.includes(opt.value)}
              onChange={() => toggleLookingFor(opt.value)}
            />
          ))}
        </div>
      </FieldWrapper>

      <FieldWrapper label="How did you hear about us?" htmlFor="referralSource" optional>
        <SelectInput
          id="referralSource"
          value={data.referralSource}
          onChange={(e) => onChange({ referralSource: e.target.value })}
        >
          <option value="">Select an option</option>
          {REFERRAL_SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </SelectInput>
      </FieldWrapper>
    </div>
  );
}

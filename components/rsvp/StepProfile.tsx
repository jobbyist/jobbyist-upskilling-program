"use client";

import { FieldWrapper, TextInput, SelectInput } from "./FormField";
import { PROVINCES, EMPLOYMENT_STATUSES } from "@/lib/constants";
import type { RsvpFormData, FieldErrors } from "./types";

const EXPERIENCE_BANDS = ["0-1 years", "2-4 years", "5-9 years", "10-15 years", "15+ years"];
const SALARY_BANDS = [
  "Prefer not to say",
  "Under R10,000/mo",
  "R10,000 - R25,000/mo",
  "R25,000 - R50,000/mo",
  "R50,000 - R100,000/mo",
  "R100,000+/mo",
];

export default function StepProfile({
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
      <h3 className="mb-1 font-heading text-xl font-bold text-ink">Your career snapshot</h3>
      <p className="mb-6 text-sm text-ink-mid">
        Helps us tailor the session and connect you with the right opportunities.
      </p>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FieldWrapper label="Province" htmlFor="province" error={errors.province}>
          <SelectInput
            id="province"
            value={data.province}
            onChange={(e) => onChange({ province: e.target.value })}
            error={!!errors.province}
          >
            <option value="" disabled>Select province</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper label="Employment status" htmlFor="employmentStatus" error={errors.employmentStatus}>
          <SelectInput
            id="employmentStatus"
            value={data.employmentStatus}
            onChange={(e) => onChange({ employmentStatus: e.target.value })}
            error={!!errors.employmentStatus}
          >
            <option value="" disabled>Select status</option>
            {EMPLOYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FieldWrapper label="Job title" htmlFor="jobTitle" optional>
          <TextInput
            id="jobTitle"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            placeholder="e.g. Junior Developer"
          />
        </FieldWrapper>
        <FieldWrapper label="Industry" htmlFor="industry" optional>
          <TextInput
            id="industry"
            value={data.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            placeholder="e.g. Finance, Retail, Tech"
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FieldWrapper label="Years of experience" htmlFor="yearsExperience" optional>
          <SelectInput
            id="yearsExperience"
            value={data.yearsExperience}
            onChange={(e) => onChange({ yearsExperience: e.target.value })}
          >
            <option value="">Select range</option>
            {EXPERIENCE_BANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </SelectInput>
        </FieldWrapper>
        <FieldWrapper label="Current salary range" htmlFor="salaryRange" optional>
          <SelectInput
            id="salaryRange"
            value={data.salaryRange}
            onChange={(e) => onChange({ salaryRange: e.target.value })}
          >
            <option value="">Select range</option>
            {SALARY_BANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <FieldWrapper label="LinkedIn profile URL" htmlFor="linkedinUrl" optional error={errors.linkedinUrl}>
        <TextInput
          id="linkedinUrl"
          type="url"
          value={data.linkedinUrl}
          onChange={(e) => onChange({ linkedinUrl: e.target.value })}
          placeholder="https://linkedin.com/in/yourname"
          error={!!errors.linkedinUrl}
        />
      </FieldWrapper>
    </div>
  );
}

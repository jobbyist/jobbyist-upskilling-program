"use client";

import { FieldWrapper, TextInput } from "./FormField";
import type { RsvpFormData, FieldErrors } from "./types";

export default function StepIdentity({
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
      <h3 className="mb-1 font-heading text-xl font-bold text-ink">Let's start with you</h3>
      <p className="mb-6 text-sm text-ink-mid">
        We'll use this to send your Zoom link and calendar invite.
      </p>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FieldWrapper label="First name" htmlFor="firstName" error={errors.firstName}>
          <TextInput
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Naledi"
            error={!!errors.firstName}
            autoComplete="given-name"
          />
        </FieldWrapper>
        <FieldWrapper label="Last name" htmlFor="lastName" error={errors.lastName}>
          <TextInput
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Dlamini"
            error={!!errors.lastName}
            autoComplete="family-name"
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Email address" htmlFor="email" error={errors.email}>
        <TextInput
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="you@example.com"
          error={!!errors.email}
          autoComplete="email"
        />
      </FieldWrapper>

      <FieldWrapper label="Phone number" htmlFor="phone" error={errors.phone}>
        <TextInput
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="+27 60 000 0000"
          error={!!errors.phone}
          autoComplete="tel"
        />
      </FieldWrapper>

      {/* Honeypot — hidden from real users via CSS, bots often fill every field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
        />
      </div>
    </div>
  );
}

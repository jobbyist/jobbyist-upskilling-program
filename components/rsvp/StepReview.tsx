"use client";

import { LOOKING_FOR_OPTIONS } from "@/lib/constants";
import type { RsvpFormData } from "./types";

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b border-charcoal-line py-2.5 text-sm last:border-none">
      <span className="text-ink-faint">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

export default function StepReview({ data }: { data: RsvpFormData }) {
  const lookingForLabels = data.lookingFor
    .map((v) => LOOKING_FOR_OPTIONS.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <h3 className="mb-1 font-heading text-xl font-bold text-ink">Review your details</h3>
      <p className="mb-6 text-sm text-ink-mid">Everything look right? Submit to reserve your seat.</p>

      <div className="rounded-xl2 border border-charcoal-line-strong bg-charcoal-raised p-5">
        <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
        <ReviewRow label="Province" value={data.province} />
        <ReviewRow label="Employment status" value={data.employmentStatus} />
        <ReviewRow label="Job title" value={data.jobTitle} />
        <ReviewRow label="Industry" value={data.industry} />
        <ReviewRow label="Looking for" value={lookingForLabels} />
      </div>
    </div>
  );
}

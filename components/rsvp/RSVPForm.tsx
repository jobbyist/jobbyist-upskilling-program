"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import ProgressBar from "./ProgressBar";
import StepIdentity from "./StepIdentity";
import StepProfile from "./StepProfile";
import StepPreferences from "./StepPreferences";
import StepConsent from "./StepConsent";
import StepReview from "./StepReview";
import ConfirmationScreen from "./ConfirmationScreen";
import { emptyFormData, type RsvpFormData, type FieldErrors } from "./types";
import type { FormStep, RsvpApiResponse } from "@/types";

const STORAGE_KEY = "jobbyist_webinar_rsvp_draft";
const STEP_ORDER: FormStep[] = ["identity", "profile", "preferences", "consent", "review"];

function validateStep(step: FormStep, data: RsvpFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (step === "identity") {
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address";
    if (!/^[+()\-\s\d]{7,20}$/.test(data.phone)) errors.phone = "Enter a valid phone number";
  }
  if (step === "profile") {
    if (!data.province) errors.province = "Select your province";
    if (!data.employmentStatus) errors.employmentStatus = "Select your employment status";
    if (data.linkedinUrl && !/^https?:\/\/.+/.test(data.linkedinUrl)) {
      errors.linkedinUrl = "Enter a valid URL (starting with https://)";
    }
  }
  if (step === "preferences") {
    if (data.lookingFor.length === 0) errors.lookingFor = "Select at least one option";
  }
  if (step === "consent") {
    if (!data.consentTerms) errors.consentTerms = "You must accept the terms to continue";
  }

  return errors;
}

export default function RSVPForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<FormStep>("identity");
  const [data, setData] = useState<RsvpFormData>(emptyFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<RsvpApiResponse | null>(null);

  // Restore any in-progress draft on mount (auto-save UX).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {
      /* ignore malformed drafts */
    }
  }, []);

  // Persist the draft on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or unavailable — non-fatal */
    }
  }, [data]);

  const handleChange = useCallback((patch: Partial<RsvpFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  function goNext() {
    const stepErrors = validateStep(step, data);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    const currentIndex = STEP_ORDER.indexOf(step);
    const next = STEP_ORDER[currentIndex + 1];
    if (next) setStep(next);
  }

  function goBack() {
    const currentIndex = STEP_ORDER.indexOf(step);
    const prev = STEP_ORDER[currentIndex - 1];
    if (prev) setStep(prev);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    const utm = {
      source: searchParams.get("utm_source") ?? undefined,
      medium: searchParams.get("utm_medium") ?? undefined,
      campaign: searchParams.get("utm_campaign") ?? undefined,
      term: searchParams.get("utm_term") ?? undefined,
      content: searchParams.get("utm_content") ?? undefined,
    };
    const referredByCode = searchParams.get("ref") ?? undefined;

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          province: data.province,
          employmentStatus: data.employmentStatus,
          jobTitle: data.jobTitle,
          industry: data.industry,
          yearsExperience: data.yearsExperience,
          linkedinUrl: data.linkedinUrl,
          salaryRange: data.salaryRange,
          lookingFor: data.lookingFor,
          referralSource: data.referralSource,
          consentTerms: data.consentTerms,
          consentMarketing: data.consentMarketing,
          referredByCode,
          utm,
          website: data.website,
        }),
      });

      const json = (await res.json()) as RsvpApiResponse;

      if (!res.ok || !json.ok) {
        if (json.error === "already_registered") {
          setSubmitError("Looks like you've already registered with this email — check your inbox for your confirmation.");
        } else if (json.error === "rate_limited") {
          setSubmitError("Too many attempts — please wait a minute and try again.");
        } else if (json.fieldErrors) {
          setErrors(json.fieldErrors as FieldErrors);
          setStep("identity");
          setSubmitError("Please check the highlighted fields and try again.");
        } else {
          setSubmitError("Something went wrong on our end. Please try again in a moment.");
        }
        setSubmitting(false);
        return;
      }

      setResult(json);
      localStorage.removeItem(STORAGE_KEY);
      setStep("complete");
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "complete" && result) {
    return (
      <section id="rsvp" className="section-pad relative">
        <div className="container-page max-w-lg">
          <GlassCard strong>
            <ConfirmationScreen result={result} firstName={data.firstName} />
          </GlassCard>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section-pad relative">
      <div className="container-page max-w-lg">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-electric-soft">
            Reserve Your Seat
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-ink md:text-4xl">
            Free to attend. 90 seconds to register.
          </h2>
        </div>

        <GlassCard strong>
          <ProgressBar current={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative"
            >
              {step === "identity" && (
                <StepIdentity data={data} errors={errors} onChange={handleChange} />
              )}
              {step === "profile" && (
                <StepProfile data={data} errors={errors} onChange={handleChange} />
              )}
              {step === "preferences" && (
                <StepPreferences data={data} errors={errors} onChange={handleChange} />
              )}
              {step === "consent" && (
                <StepConsent data={data} errors={errors} onChange={handleChange} />
              )}
              {step === "review" && <StepReview data={data} />}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {submitError}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-charcoal-line pt-6">
            {step !== "identity" ? (
              <Button variant="ghost" size="sm" onClick={goBack} type="button">
                Back
              </Button>
            ) : (
              <span />
            )}

            {step === "review" ? (
              <Button onClick={handleSubmit} disabled={submitting} type="button">
                {submitting ? "Submitting…" : "Confirm Registration"}
                {!submitting && <Icon name="arrow-right" className="h-4 w-4" />}
              </Button>
            ) : (
              <Button onClick={goNext} type="button">
                Continue <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </GlassCard>

        <p className="mt-4 text-center text-xs text-ink-faint">
          Your progress is saved automatically — close this tab and come back anytime.
        </p>
      </div>
    </section>
  );
}

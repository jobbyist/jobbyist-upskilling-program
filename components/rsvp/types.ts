export interface RsvpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
  employmentStatus: string;
  jobTitle: string;
  industry: string;
  yearsExperience: string;
  linkedinUrl: string;
  salaryRange: string;
  lookingFor: string[];
  referralSource: string;
  consentTerms: boolean;
  consentMarketing: boolean;
  website: string; // honeypot
}

export const emptyFormData: RsvpFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  province: "",
  employmentStatus: "",
  jobTitle: "",
  industry: "",
  yearsExperience: "",
  linkedinUrl: "",
  salaryRange: "",
  lookingFor: [],
  referralSource: "",
  consentTerms: false,
  consentMarketing: false,
  website: "",
};

export type FieldErrors = Partial<Record<keyof RsvpFormData, string>>;

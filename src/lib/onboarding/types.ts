import { z } from "zod";

export const SERVICE_TYPES = ["canteen", "uniform_shop", "events", "other"] as const;

export const businessDetailsSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required"),
  // ABN: 11 digits. This checks length/format only, not the official checksum algorithm.
  abn: z.string().trim().regex(/^\d{11}$/, "ABN must be 11 digits"),
  contactName: z.string().trim().min(1, "Primary contact name is required"),
  contactEmail: z.string().trim().email("Enter a valid email address"),
  contactPhone: z.string().trim().min(1, "Contact phone number is required"),
});

export const serviceDetailsSchema = z.object({
  serviceType: z.enum(SERVICE_TYPES, {
    message: "Select a service type",
  }),
  locationName: z.string().trim().min(1, "School or location name is required"),
  startDate: z.string().trim().min(1, "Expected start date is required"),
});

export type BusinessDetails = z.infer<typeof businessDetailsSchema>;
export type ServiceDetails = z.infer<typeof serviceDetailsSchema>;

export type OnboardingFormData = {
  business?: BusinessDetails;
  service?: ServiceDetails;
};

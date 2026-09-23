"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useOnboardingForm } from "@/lib/onboarding/form-context";
import { businessDetailsSchema, type BusinessDetails } from "@/lib/onboarding/types";

export default function BusinessDetailsPage() {
  const router = useRouter();
  const { data, setBusiness } = useOnboardingForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessDetails>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: data.business,
  });

  const onSubmit = (values: BusinessDetails) => {
    setBusiness(values);
    router.push("/onboarding/service");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Business details</h1>
      <p>Tell us about your business and who we should contact.</p>

      <Field label="Business name" htmlFor="businessName" error={errors.businessName?.message}>
        <input id="businessName" {...register("businessName")} />
      </Field>

      <Field label="ABN" htmlFor="abn" error={errors.abn?.message}>
        <input id="abn" inputMode="numeric" {...register("abn")} />
      </Field>

      <Field label="Primary contact name" htmlFor="contactName" error={errors.contactName?.message}>
        <input id="contactName" {...register("contactName")} />
      </Field>

      <Field label="Contact email" htmlFor="contactEmail" error={errors.contactEmail?.message}>
        <input id="contactEmail" type="email" {...register("contactEmail")} />
      </Field>

      <Field label="Contact phone" htmlFor="contactPhone" error={errors.contactPhone?.message}>
        <input id="contactPhone" type="tel" {...register("contactPhone")} />
      </Field>

      <button type="submit">Next</button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <p>{error}</p>}
    </div>
  );
}

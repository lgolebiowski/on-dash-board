"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { PageHeader } from "@/components/page-header";
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader
        title="Business details"
        description="Tell us about your business and who we should contact."
      />

      <Field label="Business name" htmlFor="businessName" error={errors.businessName?.message}>
        <Input id="businessName" {...register("businessName")} />
      </Field>

      <Field label="ABN" htmlFor="abn" error={errors.abn?.message}>
        <Input id="abn" inputMode="numeric" {...register("abn")} />
      </Field>

      <Field label="Primary contact name" htmlFor="contactName" error={errors.contactName?.message}>
        <Input id="contactName" {...register("contactName")} />
      </Field>

      <Field label="Contact email" htmlFor="contactEmail" error={errors.contactEmail?.message}>
        <Input id="contactEmail" type="email" {...register("contactEmail")} />
      </Field>

      <Field label="Contact phone" htmlFor="contactPhone" error={errors.contactPhone?.message}>
        <Input id="contactPhone" type="tel" {...register("contactPhone")} />
      </Field>

      <Button type="submit" variant="primary">
        Next
      </Button>
    </Form>
  );
}

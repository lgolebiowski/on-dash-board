"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { PageHeader } from "@/components/page-header";
import { Select } from "@/components/select";
import { useOnboardingForm } from "@/lib/onboarding/form-context";
import { SERVICE_TYPES, serviceDetailsSchema, type ServiceDetails } from "@/lib/onboarding/types";

const SERVICE_TYPE_LABELS: Record<(typeof SERVICE_TYPES)[number], string> = {
  canteen: "Canteen",
  uniform_shop: "Uniform shop",
  events: "Events",
  other: "Other",
};

export default function ServiceDetailsPage() {
  const router = useRouter();
  const { data, setService } = useOnboardingForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceDetails>({
    resolver: zodResolver(serviceDetailsSchema),
    defaultValues: data.service,
  });

  const onSubmit = (values: ServiceDetails) => {
    setService(values);
    router.push("/onboarding/review");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader
        title="Service details"
        description="Tell us what you'll be running and where."
      />

      <Field label="Service type" htmlFor="serviceType" error={errors.serviceType?.message}>
        <Select id="serviceType" defaultValue="" {...register("serviceType")}>
          <option value="" disabled>
            Select a service type
          </option>
          {SERVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {SERVICE_TYPE_LABELS[type]}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="School or location name" htmlFor="locationName" error={errors.locationName?.message}>
        <Input id="locationName" {...register("locationName")} />
      </Field>

      <Field label="Expected operating start date" htmlFor="startDate" error={errors.startDate?.message}>
        <Input id="startDate" type="date" {...register("startDate")} />
      </Field>

      <div className="flex gap-3">
        <Button type="button" onClick={() => router.push("/onboarding/business")}>
          Back
        </Button>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </Form>
  );
}

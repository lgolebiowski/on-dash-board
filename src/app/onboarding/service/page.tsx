"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Service details</h1>
      <p>Tell us what you&apos;ll be running and where.</p>

      <Field label="Service type" htmlFor="serviceType" error={errors.serviceType?.message}>
        <select id="serviceType" defaultValue="" {...register("serviceType")}>
          <option value="" disabled>
            Select a service type
          </option>
          {SERVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {SERVICE_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="School or location name" htmlFor="locationName" error={errors.locationName?.message}>
        <input id="locationName" {...register("locationName")} />
      </Field>

      <Field label="Expected operating start date" htmlFor="startDate" error={errors.startDate?.message}>
        <input id="startDate" type="date" {...register("startDate")} />
      </Field>

      <button type="button" onClick={() => router.push("/onboarding/business")}>
        Back
      </button>
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

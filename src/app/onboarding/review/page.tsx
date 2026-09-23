"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { useOnboardingForm } from "@/lib/onboarding/form-context";
import { submitOnboarding } from "@/lib/onboarding/mock-submit";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  canteen: "Canteen",
  uniform_shop: "Uniform shop",
  events: "Events",
  other: "Other",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ReviewPage() {
  const router = useRouter();
  const { data } = useOnboardingForm();
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const { business, service } = data;
  const isComplete = Boolean(business && service);

  const handleSubmit = async () => {
    if (!business || !service) return;

    setStatus("submitting");
    try {
      await submitOnboarding(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!isComplete) {
    return (
      <div>
        <PageHeader title="Review and submit" description="Please complete the previous steps first." />
        <Button type="button" variant="primary" onClick={() => router.push("/onboarding/business")}>
          Go to business details
        </Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <PageHeader
          title="Application submitted"
          description="Thanks — we've received your application and will be in touch shortly."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Review and submit" description="Check your details before submitting." />

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Business details</h2>
        <Button type="button" onClick={() => router.push("/onboarding/business")}>
          Edit
        </Button>
        <dl className="mt-2 text-sm">
          <dt className="mt-2 text-zinc-500">Business name</dt>
          <dd className="font-medium">{business.businessName}</dd>
          <dt className="mt-2 text-zinc-500">ABN</dt>
          <dd className="font-medium">{business.abn}</dd>
          <dt className="mt-2 text-zinc-500">Primary contact name</dt>
          <dd className="font-medium">{business.contactName}</dd>
          <dt className="mt-2 text-zinc-500">Contact email</dt>
          <dd className="font-medium">{business.contactEmail}</dd>
          <dt className="mt-2 text-zinc-500">Contact phone</dt>
          <dd className="font-medium">{business.contactPhone}</dd>
        </dl>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Service details</h2>
        <Button type="button" onClick={() => router.push("/onboarding/service")}>
          Edit
        </Button>
        <dl className="mt-2 text-sm">
          <dt className="mt-2 text-zinc-500">Service type</dt>
          <dd className="font-medium">{SERVICE_TYPE_LABELS[service.serviceType] ?? service.serviceType}</dd>
          <dt className="mt-2 text-zinc-500">School or location name</dt>
          <dd className="font-medium">{service.locationName}</dd>
          <dt className="mt-2 text-zinc-500">Expected operating start date</dt>
          <dd className="font-medium">{service.startDate}</dd>
        </dl>
      </section>

      {status === "error" && (
        <p className="mb-4 text-sm text-red-600">
          Something went wrong submitting your application. Please try again.
        </p>
      )}

      <Button type="button" variant="primary" onClick={handleSubmit} disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}

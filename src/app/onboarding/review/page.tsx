"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
        <h1>Review and submit</h1>
        <p>Please complete the previous steps first.</p>
        <button type="button" onClick={() => router.push("/onboarding/business")}>
          Go to business details
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <h1>Application submitted</h1>
        <p>Thanks — we&apos;ve received your application and will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Review and submit</h1>
      <p>Check your details before submitting.</p>

      <section>
        <h2>Business details</h2>
        <button type="button" onClick={() => router.push("/onboarding/business")}>
          Edit
        </button>
        <dl>
          <dt>Business name</dt>
          <dd>{business.businessName}</dd>
          <dt>ABN</dt>
          <dd>{business.abn}</dd>
          <dt>Primary contact name</dt>
          <dd>{business.contactName}</dd>
          <dt>Contact email</dt>
          <dd>{business.contactEmail}</dd>
          <dt>Contact phone</dt>
          <dd>{business.contactPhone}</dd>
        </dl>
      </section>

      <section>
        <h2>Service details</h2>
        <button type="button" onClick={() => router.push("/onboarding/service")}>
          Edit
        </button>
        <dl>
          <dt>Service type</dt>
          <dd>{SERVICE_TYPE_LABELS[service.serviceType] ?? service.serviceType}</dd>
          <dt>School or location name</dt>
          <dd>{service.locationName}</dd>
          <dt>Expected operating start date</dt>
          <dd>{service.startDate}</dd>
        </dl>
      </section>

      {status === "error" && <p>Something went wrong submitting your application. Please try again.</p>}

      <button type="button" onClick={handleSubmit} disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

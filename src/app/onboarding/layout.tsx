"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { OnboardingFormProvider } from "@/lib/onboarding/form-context";

const STEPS = ["business", "service", "review"];

function StepIndicator() {
  const pathname = usePathname();
  const stepIndex = STEPS.findIndex((step) => pathname.endsWith(step));

  if (stepIndex === -1) return null;

  return (
    <p>
      Step {stepIndex + 1} of {STEPS.length}
    </p>
  );
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingFormProvider>
      <StepIndicator />
      {children}
    </OnboardingFormProvider>
  );
}

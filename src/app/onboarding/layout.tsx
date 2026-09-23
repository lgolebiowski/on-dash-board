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
    <p className="mb-4 text-sm text-zinc-500">
      Step {stepIndex + 1} of {STEPS.length}
    </p>
  );
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingFormProvider>
      <div className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-md">
          <StepIndicator />
          {children}
        </div>
      </div>
    </OnboardingFormProvider>
  );
}

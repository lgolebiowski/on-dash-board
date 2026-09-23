"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { BusinessDetails, OnboardingFormData, ServiceDetails } from "./types";

type OnboardingFormContextValue = {
  data: OnboardingFormData;
  setBusiness: (business: BusinessDetails) => void;
  setService: (service: ServiceDetails) => void;
};

const OnboardingFormContext = createContext<OnboardingFormContextValue | null>(null);

export function OnboardingFormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingFormData>({});

  const value = useMemo<OnboardingFormContextValue>(
    () => ({
      data,
      setBusiness: (business) => setData((prev) => ({ ...prev, business })),
      setService: (service) => setData((prev) => ({ ...prev, service })),
    }),
    [data],
  );

  return (
    <OnboardingFormContext.Provider value={value}>{children}</OnboardingFormContext.Provider>
  );
}

export function useOnboardingForm() {
  const context = useContext(OnboardingFormContext);
  if (!context) {
    throw new Error("useOnboardingForm must be used within an OnboardingFormProvider");
  }
  return context;
}

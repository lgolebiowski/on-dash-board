import type { OnboardingFormData } from "./types";

// Simulates an async API call. Always succeeds after a short delay.
export function submitOnboarding(data: OnboardingFormData): Promise<{ success: true }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 800);
  });
}

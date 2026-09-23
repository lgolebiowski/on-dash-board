import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OnboardingFormProvider } from "@/lib/onboarding/form-context";
import BusinessDetailsPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("BusinessDetailsPage", () => {
  it("renders all business detail fields", () => {
    render(
      <OnboardingFormProvider>
        <BusinessDetailsPage />
      </OnboardingFormProvider>,
    );

    expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/abn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/primary contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});

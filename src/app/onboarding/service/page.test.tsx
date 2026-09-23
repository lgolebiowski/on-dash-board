import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OnboardingFormProvider } from "@/lib/onboarding/form-context";
import { todayDateString } from "@/lib/onboarding/schema";
import ServiceDetailsPage from "./page";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

function fillCommonFields() {
  fireEvent.change(screen.getByLabelText(/service type/i), { target: { value: "canteen" } });
  fireEvent.change(screen.getByLabelText(/school or location name/i), { target: { value: "Test School" } });
}

describe("ServiceDetailsPage", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("shows a validation error when the start date is in the past", async () => {
    render(
      <OnboardingFormProvider>
        <ServiceDetailsPage />
      </OnboardingFormProvider>,
    );

    fillCommonFields();
    fireEvent.change(screen.getByLabelText(/expected operating start date/i), {
      target: { value: "2000-01-01" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /next/i }).closest("form")!);

    expect(await screen.findByText(/cannot be in the past/i)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("accepts today as a valid start date", async () => {
    render(
      <OnboardingFormProvider>
        <ServiceDetailsPage />
      </OnboardingFormProvider>,
    );

    fillCommonFields();
    fireEvent.change(screen.getByLabelText(/expected operating start date/i), {
      target: { value: todayDateString() },
    });
    fireEvent.submit(screen.getByRole("button", { name: /next/i }).closest("form")!);

    await waitFor(() => expect(push).toHaveBeenCalledWith("/onboarding/review"));
  });
});

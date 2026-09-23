import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useEffect, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OnboardingFormProvider, useOnboardingForm } from "@/lib/onboarding/form-context";
import { submitOnboarding } from "@/lib/onboarding/mock-submit";
import ReviewPage from "./page";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/lib/onboarding/mock-submit", () => ({
  submitOnboarding: vi.fn(),
}));

const business = {
  businessName: "Test Co",
  abn: "12345678901",
  contactName: "Jane Doe",
  contactEmail: "jane@example.com",
  contactPhone: "0400000000",
};

const service = {
  serviceType: "canteen" as const,
  locationName: "Test School",
  startDate: "2099-01-01",
};

function Seeded({ children }: { children: ReactNode }) {
  const { setBusiness, setService } = useOnboardingForm();

  useEffect(() => {
    setBusiness(business);
    setService(service);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

function renderReviewPage() {
  return render(
    <OnboardingFormProvider>
      <Seeded>
        <ReviewPage />
      </Seeded>
    </OnboardingFormProvider>,
  );
}

describe("ReviewPage submission feedback", () => {
  beforeEach(() => {
    push.mockClear();
    vi.mocked(submitOnboarding).mockReset();
  });

  it("shows loading feedback while the submission is in flight", async () => {
    let resolveSubmit!: () => void;
    vi.mocked(submitOnboarding).mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = () => resolve({ success: true });
      }),
    );

    renderReviewPage();
    fireEvent.click(await screen.findByRole("button", { name: /^submit$/i }));

    const submittingButton = await screen.findByRole("button", { name: /submitting/i });
    expect(submittingButton).toBeDisabled();
    expect(submittingButton).toHaveAttribute("aria-busy", "true");

    resolveSubmit();
    await waitFor(() => expect(screen.getByText(/application submitted/i)).toBeInTheDocument());
  });

  it("shows success feedback once submission resolves", async () => {
    vi.mocked(submitOnboarding).mockResolvedValue({ success: true });

    renderReviewPage();
    fireEvent.click(await screen.findByRole("button", { name: /^submit$/i }));

    expect(await screen.findByText(/application submitted/i)).toBeInTheDocument();
  });

  it("shows failure feedback with a retry option and a contact number when submission rejects", async () => {
    vi.mocked(submitOnboarding).mockRejectedValue(new Error("network error"));

    renderReviewPage();
    fireEvent.click(await screen.findByRole("button", { name: /^submit$/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/something went wrong/i);

    const contactLink = screen.getByRole("link", { name: /0456 789 100/ });
    expect(contactLink).toHaveAttribute("href", "tel:0456789100");

    expect(screen.getByRole("button", { name: /^submit$/i })).not.toBeDisabled();
  });

  it("allows retrying after a failed submission", async () => {
    vi.mocked(submitOnboarding).mockRejectedValueOnce(new Error("network error"));
    vi.mocked(submitOnboarding).mockResolvedValueOnce({ success: true });

    renderReviewPage();
    fireEvent.click(await screen.findByRole("button", { name: /^submit$/i }));
    await screen.findByRole("alert");

    fireEvent.click(screen.getByRole("button", { name: /^submit$/i }));

    expect(await screen.findByText(/application submitted/i)).toBeInTheDocument();
    expect(submitOnboarding).toHaveBeenCalledTimes(2);
  });

  it("simulates a failed request via the demo button without calling the real submit", async () => {
    renderReviewPage();
    const simulateButton = await screen.findByRole("button", { name: /imitate the failed request/i });
    fireEvent.click(simulateButton);

    expect(await screen.findByRole("button", { name: /submitting/i })).toBeDisabled();
    expect(await screen.findByRole("alert", {}, { timeout: 2000 })).toHaveTextContent(/something went wrong/i);
    expect(submitOnboarding).not.toHaveBeenCalled();
  });

  it("ignores extra clicks while a submission is already in flight", async () => {
    let resolveSubmit!: () => void;
    vi.mocked(submitOnboarding).mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = () => resolve({ success: true });
      }),
    );

    renderReviewPage();
    const submitButton = await screen.findByRole("button", { name: /^submit$/i });
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(submitOnboarding).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /imitate the failed request/i })).toBeDisabled();

    resolveSubmit();
    await waitFor(() => expect(screen.getByText(/application submitted/i)).toBeInTheDocument());
  });
});

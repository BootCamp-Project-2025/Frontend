import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GridSocialLinksDetail from "../../../../../src/domains/student/components/molecules/GridSocialLinksDetail";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/shared/contexts/ToastContext", () => ({
  useToastContext: () => ({
    showToast: vi.fn(),
  }),
}));

// Mock de PUT request
vi.mock("@/shared/api/putRequest", () => ({
  putRequest: vi.fn(() => Promise.resolve({ success: true })),
}));

vi.mock("@/shared/utils/isValidLink", () => ({
  default: () => true,
}));

const mockClient = {
  id: "123",
  socialLinks: [
    { platform: "LINKEDIN", url: "https://linkedin.com/example" },
    { platform: "INSTAGRAM", url: "https://instagram.com/example" },
  ],
};

describe("GridSocialLinksDetail", () => {
  it("renders all supported social platforms", () => {
    render(
      <MemoryRouter>
        <GridSocialLinksDetail
          client={mockClient}
          setClient={() => {}}
          isEditingAll={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Linkedin")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Youtube")).toBeInTheDocument();
  });
});

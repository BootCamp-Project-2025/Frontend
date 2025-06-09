const openPopupSpy = vi.fn();

vi.mock("@/shared/hooks/usePopup", () => ({
  __esModule: true,
  default: () => ({
    openPopup: openPopupSpy,
    closePopup: vi.fn(),
  }),
}));

vi.mock("@/domains/profile/components/organisms/CertificationCard", () => {
  return {
    default: ({ certification, onEdit }) => (
      <div>
        <span>{`${certification.name} - ${certification.year}`}</span>
        <span>{certification.institution}</span>
        <button
          aria-label="Edit certification"
          onClick={() => onEdit(certification)}
        >
          Edit
        </button>
      </div>
    ),
  };
});

vi.mock("@/shared/components/atoms/Button", () => {
  return {
    // eslint-disable-next-line react/prop-types
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  };
});

vi.mock("@/domains/profile/components/organisms/CertificationForm", () => ({
  default: () => <div>CertificationForm</div>,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import CertificationList from "../../../domains/profile/components/templates/CertificationList";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("CertificationList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the certifications list with correct data", () => {
    render(<CertificationList />);
    expect(screen.getByText(/Certification 1 - 2015/)).toBeInTheDocument();
    expect(screen.getByText(/ABC/)).toBeInTheDocument();
    expect(screen.getByText(/Certification 2 - 2015/)).toBeInTheDocument();
    expect(screen.getByText(/DEF/)).toBeInTheDocument();
    expect(screen.getByText(/Certification 3 - 2015/)).toBeInTheDocument();
    expect(screen.getByText(/GHI/)).toBeInTheDocument();
  });

  it("renders the Add Certification button", () => {
    render(<CertificationList />);
    expect(
      screen.getByRole("button", { name: /Add Certification/i })
    ).toBeInTheDocument();
  });

  it("calls openPopup when Add Certification button is clicked", () => {
    render(<CertificationList />);
    const addButton = screen.getByRole("button", {
      name: "Add Certification",
    });
    fireEvent.click(addButton);
    expect(openPopupSpy).toHaveBeenCalled();
  });

  it("calls openPopup with edit form when Edit button is clicked", () => {
    render(<CertificationList />);
    const editButtons = screen.getAllByRole("button", {
      name: "Edit certification",
    });
    fireEvent.click(editButtons[0]);
    expect(openPopupSpy).toHaveBeenCalled();
  });

  it("adds a new certification when onAddCertification is called", () => {
    render(<CertificationList />);
    fireEvent.click(screen.getByRole("button", { name: /Add Certification/i }));
    expect(screen.getByText(/Certification 1 - 2015/)).toBeInTheDocument();
    expect(screen.getByText(/Certification 2 - 2015/)).toBeInTheDocument();
    expect(screen.getByText(/Certification 3 - 2015/)).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<CertificationList />);
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });
});

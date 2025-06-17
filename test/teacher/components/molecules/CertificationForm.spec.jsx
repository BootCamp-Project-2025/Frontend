import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CertificationForm from "../../../../src/domains/teacher/components/molecules/CertificationForm";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("CertificationForm", () => {
  const defaultProps = {
    closePopup: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with all fields", () => {
    render(<CertificationForm {...defaultProps} />);
    expect(screen.getByLabelText(/Certification Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Institution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("calls closePopup when close button is clicked", async () => {
    render(<CertificationForm {...defaultProps} />);
    const closeBtn = screen.getByRole("button", { name: /Close form/i });
    await waitFor(() => fireEvent.click(closeBtn));
    expect(defaultProps.closePopup).toHaveBeenCalled();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<CertificationForm {...defaultProps} />);
    await waitFor(() =>
      fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    );

    expect(
      screen.getByText(/Certification name is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Institution is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Year is required/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<CertificationForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/Certification Name/i), {
      target: { value: "React Cert" },
    });
    fireEvent.change(screen.getByLabelText(/Institution/i), {
      target: { value: "Coursera" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2022" },
    });

    await waitFor(() =>
      fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    );

    expect(defaultProps.onSubmit).toHaveBeenCalledWith({
      id: "",
      name: "React Cert",
      institution: "Coursera",
      year: "2022",
    });
    expect(defaultProps.closePopup).toHaveBeenCalled();
  });

  it("renders Delete button if onDelete and certification are provided", () => {
    const onDelete = vi.fn();
    const certification = {
      id: "1",
      name: "Cert",
      institution: "Inst",
      year: 2020,
    };
    render(
      <CertificationForm
        {...defaultProps}
        onDelete={onDelete}
        certification={certification}
      />
    );
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("calls onDelete with certification id when Delete is clicked", async () => {
    const onDelete = vi.fn();
    const certification = {
      id: "1",
      name: "Cert",
      institution: "Inst",
      year: 2020,
    };
    render(
      <CertificationForm
        {...defaultProps}
        onDelete={onDelete}
        certification={certification}
      />
    );
    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    await waitFor(() => fireEvent.click(deleteBtn));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("shows min/max validation errors for name, institution, and year", async () => {
    render(<CertificationForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/Certification Name/i), {
      target: { value: "A" },
    });
    fireEvent.change(screen.getByLabelText(/Institution/i), {
      target: { value: "B" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "1800" },
    });

    await waitFor(() =>
      fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    );

    const minLengthErrors = screen.getAllByText(
      /Minimum length is 2 characters/i
    );
    expect(minLengthErrors).toHaveLength(2); // name + institution

    expect(screen.getByText(/Year must be after 1900/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: `${new Date().getFullYear() + 1}` },
    });

    await waitFor(() =>
      fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    );

    expect(
      screen.getByText(/Year cannot be in the future/i)
    ).toBeInTheDocument();
  });
});

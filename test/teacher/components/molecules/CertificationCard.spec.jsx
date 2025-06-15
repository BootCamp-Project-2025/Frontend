import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CertificationCard from "../../../../src/domains/teacher/components/molecules/CertificationCard";
import { describe, it, expect, vi } from "vitest";

describe("CertificationCard", () => {
  const certification = {
    name: "React Developer",
    year: 2023,
    institution: "OpenAI University",
  };

  it("renders certification name, year, and institution", () => {
    render(<CertificationCard certification={certification} />);
    expect(screen.getByText(/React Developer - 2023/)).toBeInTheDocument();
    expect(screen.getByText(/OpenAI University/)).toBeInTheDocument();
  });

  it("renders the edit button", () => {
    render(<CertificationCard certification={certification} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls onEdit with certification when edit button is clicked", async () => {
    const onEdit = vi.fn();
    render(<CertificationCard certification={certification} onEdit={onEdit} />);
    const button = screen.getByRole("button");
    await waitFor(() => fireEvent.click(button));
    expect(onEdit).toHaveBeenCalledWith(certification);
  });

  it("does not throw if onEdit is not provided", async () => {
    render(<CertificationCard certification={certification} />);
    const button = screen.getByRole("button");
    await waitFor(() => fireEvent.click(button));
    expect(true).toBe(true); // Confirm no error is thrown
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import CertificationCard from "../../../domains/profile/components/organisms/CertificationCard";
import { describe, it, expect, vi } from "vitest";

describe("CertificationCard", () => {
  const certification = {
    name: "React Developer",
    year: 2023,
    institution: "OpenAI Academy",
  };

  it("renders certification name and year", () => {
    render(<CertificationCard certification={certification} />);
    expect(screen.getByText(/React Developer - 2023/)).toBeInTheDocument();
  });

  it("renders certification institution", () => {
    render(<CertificationCard certification={certification} />);
    expect(screen.getByText(/OpenAI Academy/)).toBeInTheDocument();
  });

  it("renders the edit button", () => {
    render(<CertificationCard certification={certification} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onEdit with certification when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<CertificationCard certification={certification} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onEdit).toHaveBeenCalledWith(certification);
  });
});

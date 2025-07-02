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
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls editCard with certification when edit button is clicked", async () => {
    const editCard = vi.fn();
    render(
      <CertificationCard certification={certification} editCard={editCard} />
    );
    const buttons = screen.getAllByRole("button");
    const editButton = buttons[0];
    await waitFor(() => fireEvent.click(editButton));
    expect(editCard).toHaveBeenCalledWith(certification.id);
  });

  it("does not throw if editCard is not provided", async () => {
    render(<CertificationCard certification={certification} />);
    const buttons = screen.getAllByRole("button");
    const editButton = buttons[0];
    await waitFor(() => fireEvent.click(editButton));
    expect(true).toBe(true);
  });
});

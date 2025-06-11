import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExperienceCard } from "../../../src/domains/Teacher/components/molecules/ExperienceCard";

describe("ExperienceCard", () => {
  const mockProps = {
    id: "123",
    jobPosition: "Frontend Developer",
    employer: "Tech Company",
    country: "United States",
    startDate: "2020-02",
    endDate: "2022-05",
    description: "Developed user interfaces using React and TypeScript",
    editCard: vi.fn(),
  };

  it("renders all provided props correctly", () => {
    render(<ExperienceCard {...mockProps} />);

    expect(screen.getByText(mockProps.jobPosition)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.startDate} - ${mockProps.endDate}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.employer}, ${mockProps.country}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it("renders the edit button with correct icon", () => {
    render(<ExperienceCard {...mockProps} />);
    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();

    const editIcon = editButton.querySelector("svg");
    expect(editIcon).toBeInTheDocument();
  });

  it("applies the correct background and styling classes", () => {
    render(<ExperienceCard {...mockProps} />);
    const card = screen.getByTestId("experience-card");
    expect(card).toHaveClass("bg-[#D7E6FD]");
  });

  it("calls editCard with correct id when edit button is clicked", () => {
    render(<ExperienceCard {...mockProps} />);

    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    expect(mockProps.editCard).toHaveBeenCalledWith("123");
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });
});

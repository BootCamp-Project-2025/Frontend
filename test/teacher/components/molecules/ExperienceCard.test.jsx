import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExperienceCard } from "../../../../src/domains/teacher/components/molecules/ExperienceCard";

describe("ExperienceCard", () => {
  const mockProps = {
    id: "123",
    position: "Frontend Developer",
    employer: "Tech Company",
    country: "United States",
    startDate: "2020-02",
    endDate: "2022-05",
    description: "Developed user interfaces using React and TypeScript",
    editCard: vi.fn(),
  };

  it("renders all provided props correctly", () => {
    render(<ExperienceCard {...mockProps} />);

    expect(screen.getByText(mockProps.position)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.startDate} - ${mockProps.endDate}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.employer}, ${mockProps.country}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it("renders the edit button ", () => {
    render(<ExperienceCard {...mockProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  it("calls edit form with correct id when edit button is clicked", () => {
    render(<ExperienceCard {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const editButton = buttons[0];
    fireEvent.click(editButton);

    expect(mockProps.editCard).toHaveBeenCalledWith("123");
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });
});

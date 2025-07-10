import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationCard } from "../../../../src/domains/teacher/components/molecules/EducationCard";

describe("EducationCard", () => {
  const mockProps = {
    id: "123",
    university: "Harvard University",
    career: "Computer Science",
    startDate: "2018-09",
    finishDate: "2022-06",
    editCard: vi.fn(),
  };

  it("renders all provided props correctly", () => {
    render(<EducationCard {...mockProps} />);
    expect(screen.getByText(mockProps.university)).toBeInTheDocument();
    expect(screen.getByText(mockProps.career)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.startDate}, ${mockProps.finishDate}`)
    ).toBeInTheDocument();
  });

  it("renders the edit button", () => {
    render(<EducationCard {...mockProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls edit form with the correct id when edit button is clicked", () => {
    render(<EducationCard {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const editButton = buttons[0];
    fireEvent.click(editButton);

    expect(mockProps.editCard).toHaveBeenCalledWith("123");
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });
});

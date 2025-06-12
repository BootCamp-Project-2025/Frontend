import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationCard } from "../../../../src/domains/teacher/components/molecules/EducationCard";

describe("EducationCard", () => {
  const mockProps = {
    id: "123",
    university: "Harvard University",
    career: "Computer Science",
    startDate: "2018-09",
    endDate: "2022-06",
    editCard: vi.fn(),
  };

  it("renders all provided props correctly", () => {
    render(<EducationCard {...mockProps} />);

    expect(screen.getByText(mockProps.university)).toBeInTheDocument();
    expect(screen.getByText(mockProps.career)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.startDate}, ${mockProps.endDate}`)
    ).toBeInTheDocument();
  });

  it("renders the edit button with correct icon", () => {
    render(<EducationCard {...mockProps} />);
    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();

    const editIcon = editButton.querySelector("svg");
    expect(editIcon).toBeInTheDocument();
  });

  it("applies the correct background and styling classes", () => {
    render(<EducationCard {...mockProps} />);
    const card = screen.getByTestId("experience-card");
    expect(card).toHaveClass("bg-[#D7E6FD]");
  });

  it("calls editCard with correct id when edit button is clicked", () => {
    render(<EducationCard {...mockProps} />);

    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    expect(mockProps.editCard).toHaveBeenCalledWith("123");
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });
});

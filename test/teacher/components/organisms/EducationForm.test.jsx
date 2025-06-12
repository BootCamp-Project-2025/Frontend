import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EducationForm } from "../../../../src/domains/teacher/components/organisms/EducationForm";

vi.stubGlobal("crypto", {
  randomUUID: () => "mocked-uuid-1234",
});

describe("EducationForm", () => {
  const mockAddCard = vi.fn();
  const mockCloseForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required input fields", () => {
    render(<EducationForm />);

    expect(screen.getByLabelText("University")).toBeInTheDocument();
    expect(screen.getByLabelText("Career")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<EducationForm />);

    fireEvent.click(screen.getByText("Save"));

    const errorMessages = await screen.findAllByText("This field is required");
    expect(errorMessages).toHaveLength(4);
  });

  it("submits the form with correct data for a new record", async () => {
    render(<EducationForm addCard={mockAddCard} closeForm={mockCloseForm} />);

    fireEvent.change(screen.getByLabelText("University"), {
      target: { value: "MIT" },
    });
    fireEvent.change(screen.getByLabelText("Career"), {
      target: { value: "Computer Science" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2020-01" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2022-01" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(
      () => {
        expect(mockAddCard).toHaveBeenCalledWith(
          expect.objectContaining({
            id: "mocked-uuid-1234",
            university: "MIT",
            career: "Computer Science",
            startDate: "2020-01",
            endDate: "2022-01",
          })
        );
      },
      { timeout: 1500 }
    );

    expect(mockCloseForm).toHaveBeenCalled();
  });
});

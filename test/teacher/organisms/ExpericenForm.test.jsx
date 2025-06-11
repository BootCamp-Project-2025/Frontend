import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ExperienceForm } from "../../../src/domains/teacher/components/organisms/ExperienceForm";

vi.stubGlobal("crypto", {
  randomUUID: () => "mocked-uuid-1234",
});

describe("ExperienceForm", () => {
  const mockAddCard = vi.fn();
  const mockCloseForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required input fields", () => {
    render(<ExperienceForm />);

    expect(screen.getByLabelText("Position")).toBeInTheDocument();
    expect(screen.getByLabelText("Employer")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<ExperienceForm />);

    fireEvent.click(screen.getByText("Save"));

    const errorMessages = await screen.findAllByText("This field is required");
    expect(errorMessages).toHaveLength(6);
  });

  it("submits the form with correct data for a new record", async () => {
    render(<ExperienceForm addCard={mockAddCard} closeForm={mockCloseForm} />);

    fireEvent.change(screen.getByLabelText("Position"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByLabelText("Employer"), {
      target: { value: "Google" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "Bolivia" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2020-01" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2022-01" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A".repeat(55) },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(
      () => {
        expect(mockAddCard).toHaveBeenCalledWith(
          expect.objectContaining({
            id: "mocked-uuid-1234",
            jobPosition: "Developer",
            employer: "Google",
            country: "Bolivia",
            startDate: "2020-01",
            endDate: "2022-01",
            description: expect.any(String),
          })
        );
      },
      { timeout: 1500 }
    );

    expect(mockCloseForm).toHaveBeenCalled();
  });
});

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { EducationSection } from "../../../../src/domains/teacher/components/organisms/EducationSection";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            university: "MIT",
            career: "Aerospace Engineering",
            startDate: "2016-09",
            endDate: "2020-06",
          },
        ]),
    })
  );
});

describe("EducationSection", () => {
  it("renders card after fetching data", async () => {
    render(<EducationSection />);

    await waitFor(() => {
      expect(screen.getByText("MIT")).toBeInTheDocument();
      expect(screen.getByText("Aerospace Engineering")).toBeInTheDocument();
      expect(screen.getByText("2016-09, 2020-06")).toBeInTheDocument();
      expect(screen.getByText("Education")).toBeInTheDocument(); // render Seccion Education
      expect(screen.getByText("Add Education")).toBeInTheDocument(); // render button to add a new Education
    });
  });

  it("opens the form when clicking 'Add Education'", async () => {
    render(<EducationSection />);
    const addBtn = screen.getByText("Add Education");
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(screen.getByText("Education Form")).toBeInTheDocument();
    });
  });
});

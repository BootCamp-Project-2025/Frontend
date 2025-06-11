import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { ExperienceSection } from "../../../src/domains/teacher/components/organisms/ExperienceSection";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            jobPosition: "Software Engineer",
            employer: "TechCorp",
            country: "USA",
            startDate: "2020-05",
            endDate: "2020-08",
            description: "I worked as a Backend Developer focusing",
          },
        ]),
    })
  );
});

describe("ExperienceSection", () => {
  it("renders card after fetching data", async () => {
    render(<ExperienceSection />);

    await waitFor(() => {
      expect(screen.getByText(/TechCorp\s*,\s*USA/)).toBeInTheDocument();
      expect(
        screen.getByText(/\s*2020-05\s*-\s*2020-08\s*/)
      ).toBeInTheDocument();
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
      expect(
        screen.getByText("I worked as a Backend Developer focusing")
      ).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument(); // render Seccion Experience
      expect(screen.getByText("Add Experience")).toBeInTheDocument(); // render button to add a new experience
    });
  });

  it("opens the form when clicking 'Add Experience'", async () => {
    render(<ExperienceSection />);
    const addBtn = screen.getByText("Add Experience");
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(screen.getByText("Experience Form")).toBeInTheDocument();
    });
  });
});

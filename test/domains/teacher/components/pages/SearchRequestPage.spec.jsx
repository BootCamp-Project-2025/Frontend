/* eslint-disable react/prop-types */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchRequestPage } from "../../../../../src/domains/teacher/pages/SearchRequestPage.jsx";

// Mock child components
vi.mock("../../../shared/components/molecules/Searcher", () => ({
  Searcher: ({ placeholder }) => <input placeholder={placeholder} />,
}));

vi.mock("../../core/componentes/organism/Filters", () => ({
  Filters: ({ activeFilters }) => (
    <div>
      {activeFilters.map((filter) => (
        <span key={filter}>{filter}</span>
      ))}
    </div>
  ),
}));
vi.mock("../../../shared/components/molecules/Pagination", () => ({
  Pagination: () => <div>Pagination</div>,
}));
vi.mock("../components/molecules/RequestCard", () => ({
  default: ({ request }) => <div>{request.title}</div>,
}));

const mockRequests = [
  {
    id: 1,
    title: "Math Tutoring",
    deadline: "2024-07-01",
    description: "Need help with calculus homework and exam prep.",
    student: "John Doe",
  },
  {
    id: 2,
    title: "Physics Help",
    deadline: "2024-07-05",
    description: "Assistance with quantum mechanics.",
    student: "Jane Smith",
  },
];

describe("SearchRequestPage", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRequests),
      })
    );
  });

  it("renders the page title", () => {
    render(<SearchRequestPage />);
    expect(
      screen.getByRole("heading", { name: /students requests/i })
    ).toBeInTheDocument();
  });

  it("renders the Searcher input", () => {
    render(<SearchRequestPage />);
    expect(
      screen.getByPlaceholderText(/Search requests just for you/i)
    ).toBeInTheDocument();
  });

  it("renders the Filters component with active filters", () => {
    render(<SearchRequestPage />);
    expect(screen.getByText("category")).toBeInTheDocument();
    expect(screen.getByText("subcategory")).toBeInTheDocument();
    expect(screen.getByText("language")).toBeInTheDocument();
  });

  it("fetches and displays requests as RequestCards", async () => {
    render(<SearchRequestPage />);
    await waitFor(() => {
      expect(screen.getByText("Math Tutoring")).toBeInTheDocument();
      expect(screen.getByText("Physics Help")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully", async () => {
    global.fetch = vi.fn(() => Promise.reject("API error"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<SearchRequestPage />);
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        "Error loading requests:",
        "API error"
      );
    });
    errorSpy.mockRestore();
  });
});

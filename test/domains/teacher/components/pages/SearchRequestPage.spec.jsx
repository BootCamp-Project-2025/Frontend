import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchRequestPage } from "../../../../../src/domains/teacher/pages/SearchRequestPage.jsx";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../shared/components/molecules/Searcher", () => ({
  // eslint-disable-next-line react/prop-types
  Searcher: ({ placeholder }) => <input placeholder={placeholder} />,
}));

vi.mock("../../core/componentes/organism/Filters", () => ({
  // eslint-disable-next-line react/prop-types
  Filters: ({ activeFilters }) => (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
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

// Mock del Loading
vi.mock("../../../shared/components/molecules/Loading", () => ({
  Loading: () => <div>Loading...</div>,
}));

// Mock del ToastContext
vi.mock("../../../shared/contexts/ToastContext", () => ({
  useToastContext: () => ({
    showToast: vi.fn(),
  }),
}));

// Mock de Axios
vi.mock("../../../../../src/shared/api/axios/AxiosConnection", () => ({
  baseAPI: {
    get: vi.fn(),
  },
}));

import { baseAPI } from "../../../../../src/shared/api/axios/AxiosConnection";

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
    baseAPI.get.mockResolvedValue({
      status: 200,
      data: {
        data: {
          data: mockRequests,
          total: mockRequests.length,
        },
      },
    });
  });

  it("renders the page title", () => {
    render(
      <MemoryRouter>
        <SearchRequestPage />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /students requests/i })
    ).toBeInTheDocument();
  });

  it("renders the Searcher input", () => {
    render(
      <MemoryRouter>
        <SearchRequestPage />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/Search requests just for you/i)
    ).toBeInTheDocument();
  });

  it("renders the Filters component with active filters", () => {
    render(
      <MemoryRouter>
        <SearchRequestPage />
      </MemoryRouter>
    );
    expect(screen.getByText("category")).toBeInTheDocument();
    expect(screen.getByText("subcategory")).toBeInTheDocument();
    expect(screen.getByText("language")).toBeInTheDocument();
  });

  it("fetches and displays requests as RequestCards", async () => {
    render(
      <MemoryRouter>
        <SearchRequestPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Math Tutoring")).toBeInTheDocument();
      expect(screen.getByText("Physics Help")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully", async () => {
    baseAPI.get.mockRejectedValue(new Error("API error"));
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <SearchRequestPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      // La lógica actual solo muestra toast, podrías agregar una lógica visual para probar mejor.
      expect(baseAPI.get).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../../../src/shared/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: "user-1" } }),
}));

vi.mock("../../../../../src/shared/providers/AuthProvider", () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

const mockGetRequest = vi.fn();
vi.mock("../../../../../src/shared/api/getRequest", () => ({
  getRequest: (...args) => mockGetRequest(...args),
}));

import RequestDetail from "../../../../../src/domains/core/componentes/organism/RequestDetail";

describe("RequestDetail", () => {
  beforeEach(() => {
    mockGetRequest.mockReset();
  });

  it("renders request details and chats", async () => {
    // Primera llamada: request
    mockGetRequest
      .mockResolvedValueOnce({
        data: {
          data: {
            title: "Req 1",
            userId: "user-1",
            category: "Math",
            subCategory: "Algebra",
            description: "Need help",
          },
        },
      })

      .mockResolvedValueOnce({ data: { userName: "Alice" } });

    render(
      <MemoryRouter>
        <RequestDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Req 1")).toBeInTheDocument();
      expect(screen.getByText("Math")).toBeInTheDocument();
      expect(screen.getByText("Algebra")).toBeInTheDocument();
      expect(screen.getByText("Need help")).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Open Chat/i).length).toBeGreaterThan(0);
  });
});

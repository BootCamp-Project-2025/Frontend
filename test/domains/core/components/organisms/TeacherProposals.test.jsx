import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PropTypes from "prop-types";

vi.mock("../../../../../src/shared/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: "teacher-1" } }),
}));

vi.mock("../../../../../src/shared/providers/AuthProvider", () => {
  const AuthProvider = ({ children }) => <div>{children}</div>;
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return { AuthProvider };
});

const mockGetRequest = vi.fn();
vi.mock("../../../../../src/shared/api/getRequest", () => ({
  getRequest: (...args) => mockGetRequest(...args),
}));

import TeacherProposals from "../../../../../src/domains/core/componentes/organism/TeacherProposals";

describe("TeacherProposals", () => {
  beforeEach(() => {
    mockGetRequest.mockReset();
  });

  it("renders proposals and filters by title", async () => {
    mockGetRequest
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              requestId: "r1",
              status: "Pending",
              chatId: "c1",
              description: "desc",
            },
          ],
        },
      })
      .mockResolvedValueOnce({ data: { data: { title: "Title 1" } } });

    render(
      <MemoryRouter>
        <TeacherProposals />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Find by title");
    fireEvent.change(input, { target: { value: "nonexistent" } });

    const searchBar = input.closest("div");
    fireEvent.click(within(searchBar).getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/No proposals found/i)).toBeInTheDocument();
    });
  });
});

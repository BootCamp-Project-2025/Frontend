import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RequestMessageCard from "../../../../../src/domains/core/componentes/molecules/RequestMessageCard";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../../shared/utils/formatDateLabel", () => ({
  formatDateLabel: (date) => `formatted-${date}`,
}));

vi.mock("../../../../shared/utils/getStatusColor", () => ({
  getStatusColor: (status) => `color-for-${status}`,
}));

describe("RequestMessageCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const proposal = {
    userName: "Test User",
    profilePicture: "",
    chatId: "chat123",
    lastMessage: "This is the last message",
    updatedAt: "2025-08-04T21:00:00Z",
    createdAt: "2025-08-01T10:00:00Z",
    status: "pending",
  };

  it("renders correctly and navigates on button click", () => {
    render(
      <MemoryRouter>
        <RequestMessageCard proposal={proposal} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test User")).toBeDefined();
    expect(screen.getByText("pending")).toBeDefined();
    expect(screen.getByText(/Updated at:/)).toBeDefined();
    expect(screen.getByText("This is the last message")).toBeDefined();

    const button = screen.getByRole("button", { name: /open chat/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(`/student/chats`, {
      state: { chatId: "chat123" },
    });
  });
});

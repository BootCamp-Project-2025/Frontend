import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import RequestMessageCard from "../../../../../src/domains/core/componentes/molecules/RequestMessageCard";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});

describe("RequestMessageCard", () => {
  const chat = {
    chatId: "chat-123",
    userName: "Bob",
    updatedAt: 5,
    lastMessage: "Hello",
  };

  it("renders chat details", () => {
    render(
      <MemoryRouter>
        <RequestMessageCard chat={chat} />
      </MemoryRouter>
    );

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText(/5 days ago/i)).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("navigates to chat on button click", () => {
    render(
      <MemoryRouter>
        <RequestMessageCard chat={chat} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Open Chat"));
    expect(navigateMock).toHaveBeenCalledWith("/chats/chat-123");
  });
});

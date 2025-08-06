import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProposalCard from "../../../../../src/domains/core/componentes/molecules/ProposalCard";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../../../shared/utils/getStatusColor", () => ({
  getStatusColor: vi.fn(() => "red"),
}));
vi.mock("../../../../shared/utils/capitalize", () => ({
  capitalize: vi.fn((val) => val),
}));

describe("ProposalCard", () => {
  const proposal = {
    requestId: "123",
    requestTitle: "Math Tutoring",
    status: "PENDING",
    chatId: "chat-456",
    description: "I can help with math",
  };

  it("renders proposal details", () => {
    render(
      <MemoryRouter>
        <ProposalCard proposal={proposal} />
      </MemoryRouter>
    );

    expect(screen.getByText("Math Tutoring")).toBeInTheDocument();
    expect(screen.getByText("I can help with math")).toBeInTheDocument();
    expect(screen.getByText("Open chat")).toBeInTheDocument();
  });

  it("links to request and chat correctly", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ProposalCard proposal={proposal} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /open chat/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/teacher/chats", {
      state: { chatId: "chat-456" },
    });
  });
});

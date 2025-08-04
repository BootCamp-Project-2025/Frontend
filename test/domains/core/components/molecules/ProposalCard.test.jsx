import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProposalCard from "../../../../../src/domains/core/componentes/molecules/ProposalCard";

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
    render(
      <MemoryRouter>
        <ProposalCard proposal={proposal} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/teacher/requests/123");
    expect(links[1]).toHaveAttribute("href", "/teacher/chats/chat-456");
  });
});

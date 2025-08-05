import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useNavigate } from "react-router-dom";
import RequestMessageCard from "../../../../../src/domains/core/componentes/molecules/RequestMessageCard";
import profileDefault from "../../../../../src/assets/profile.png";
import { formatDateLabel } from "../../../../../src/shared/utils/formatDateLabel";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../../../../src/shared/utils/formatDateLabel");

describe("RequestMessageCard", () => {
  const mockNavigate = vi.fn();
  const baseProposal = {
    chatId: "chat123",
    profilePicture: "http://example.com/image.png",
    userName: "Jane Doe",
    updatedAt: "2025-08-05T10:00:00Z",
    createdAt: "2025-08-04T09:00:00Z",
    lastMessage: "Hello there",
    status: "OPEN",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    formatDateLabel.mockReturnValue("05/08/2025");
  });

  it("renders user info and last message", () => {
    render(<RequestMessageCard proposal={baseProposal} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("uses default profile image when none is provided", () => {
    const proposalWithoutImage = { ...baseProposal, profilePicture: "" };

    render(<RequestMessageCard proposal={proposalWithoutImage} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", profileDefault);
  });

  it("calls navigate with chat route when clicking Open Chat button", () => {
    render(<RequestMessageCard proposal={baseProposal} />);
    const button = screen.getByText("Open Chat");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/chats/chat123");
  });

  it.each([
    ["ACCEPTED", "var(--color-success-500)"],
    ["REJECTED", "var(--color-danger-500)"],
    ["NEW", "var(--color-warning-500)"],
    ["SENT", "var(--color-warning-500)"],
    ["ANYTHING_ELSE", "var(--color-secondary-500)"],
  ])("applies correct color for status %s", (status, expectedColor) => {
    render(<RequestMessageCard proposal={{ ...baseProposal, status }} />);
    const statusText = screen.getByText(status);
    expect(statusText.parentElement).toHaveStyle({ color: expectedColor });
  });
});

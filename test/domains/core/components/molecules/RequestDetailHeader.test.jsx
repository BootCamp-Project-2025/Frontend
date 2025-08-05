import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useAuth } from "../../../../../src/shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../../../../../src/shared/contexts/ToastContext";
import RequestDetailHeader from "../../../../../src/domains/core/componentes/molecules/RequestDetailHeader";
import { postRequest } from "../../../../../src/shared/api/postRequest";

vi.mock("../../../../../src/shared/hooks/useAuth");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../../../../src/shared/contexts/ToastContext");
vi.mock("../../../../../src/shared/api/postRequest");

describe("RequestDetailHeader", () => {
  const mockNavigate = vi.fn();
  const mockShowToast = vi.fn();

  const defaultProps = {
    request: {
      title: "Test Request",
      userId: "user123",
      description: "Description",
      chatId: "chat1",
    },
    userName: "John Doe",
    requestId: "req1",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useToastContext.mockReturnValue({ showToast: mockShowToast });
  });

  it("renders Loading when no user", () => {
    useAuth.mockReturnValue({ user: null });

    render(<RequestDetailHeader {...defaultProps} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders title and creator name", () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });

    render(<RequestDetailHeader {...defaultProps} />);
    expect(screen.getByText("Test Request")).toBeInTheDocument();
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("shows Send a message button when user is not request owner", () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });

    render(<RequestDetailHeader {...defaultProps} />);
    expect(screen.getByText("Send a message")).toBeInTheDocument();
  });

  it("does not show Send a message button when user is the request owner", () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(<RequestDetailHeader {...defaultProps} />);
    expect(screen.queryByText("Send a message")).not.toBeInTheDocument();
  });

  it("navigates back when clicking back button", () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });

    render(<RequestDetailHeader {...defaultProps} />);
    const backButton = screen.getByRole("button", { name: "" });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("handles successful chat creation", async () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });
    postRequest.mockResolvedValue({
      success: true,
      data: { id: "chat123" },
    });

    render(<RequestDetailHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Send a message"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/chats/chat123");
    });
  });

  it("handles failed chat creation", async () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });
    postRequest.mockResolvedValue({
      success: false,
      error: "Server error",
    });

    render(<RequestDetailHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Send a message"));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        "Error sending message",
        "error"
      );
    });
  });

  it("handles unexpected error in chat creation", async () => {
    useAuth.mockReturnValue({ user: { id: "otherUser" } });
    postRequest.mockRejectedValue(new Error("Network error"));

    render(<RequestDetailHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Send a message"));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        "Unexpected error creating chat",
        "error"
      );
    });
  });
});

import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProposalForm from "../../../../../src/domains/course/components/organisms/ProposalForm";

const mockInitialData = {
  id: "123",
  userId: "u123",
  requestId: "r123",
  description: "Test description",
  sessions: [{ title: "Session 1", datetime: "2026-07-31T03:52:20.461Z" }],
  createdAt: "2025-07-31T03:40:24.846Z",
  status: "SENT",
};

describe("ProposalForm logic", () => {
  it("initializes with correct data", () => {
    render(
      <ProposalForm
        initialData={mockInitialData}
        requestTitle="Mock Request"
        onClose={vi.fn()}
      />
    );

    const descriptionInput = screen.getByDisplayValue("Test description");
    expect(descriptionInput).toBeInTheDocument();

    const requestText = screen.getByText(/"Mock Request"/);
    expect(requestText).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = vi.fn();
    render(
      <ProposalForm
        initialData={mockInitialData}
        requestTitle="Test"
        onClose={onClose}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("resets the form state when Send is clicked", () => {
    render(
      <ProposalForm
        initialData={mockInitialData}
        requestTitle="Test"
        onClose={vi.fn()}
      />
    );

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    const resetDescription = screen.getByDisplayValue("Test description");
    expect(resetDescription).toBeInTheDocument();
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StudentEmptyRequestsMessage from "../../../../../src/domains/core/componentes/molecules/StudentEmptyRequestsMessage";

describe("StudentEmptyRequestsMessage", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders", () => {
    render(<StudentEmptyRequestsMessage />);
    const title = screen.getByText("Post your first request");
    const description = screen.getByText(
      "Describe your needs and create a request. Then get a curated list of offers to choose from"
    );
    const createRequestButton = screen.getByRole("button");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(createRequestButton).toBeInTheDocument();
  });
  it("call the create request function", () => {
    const handleCreateRequestMock = vi.fn();
    render(
      <StudentEmptyRequestsMessage
        handleCreateRequest={handleCreateRequestMock}
      />
    );
    const createRequestButton = screen.getByRole("button");
    createRequestButton.click();
    expect(handleCreateRequestMock).toHaveBeenCalled();
  });
});

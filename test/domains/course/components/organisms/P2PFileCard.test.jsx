import { render, screen, fireEvent } from "@testing-library/react";
import P2PFileCard from "../../../../../src/domains/course/components/molecules/P2PFileCard";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock(
  "../../../../../src/domains/course/components/molecules/P2PCardButtons",
  () => ({
    default: ({ erase }) => (
      <div>
        <button onClick={erase}>Erase</button>
      </div>
    ),
  })
);

describe("P2PFileCard", () => {
  const mockFilePost = {
    id: "file-123",
    url: "https://example.com/files/my-document.pdf",
  };

  const mockErase = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the file name extracted from URL", () => {
    render(<P2PFileCard filePost={mockFilePost} erase={mockErase} />);

    expect(screen.getByText("my-document.pdf")).toBeInTheDocument();
  });

  it("renders the link with correct attributes", () => {
    render(<P2PFileCard filePost={mockFilePost} erase={mockErase} />);

    const link = screen.getByRole("link", { name: /my-document\.pdf/i });
    expect(link).toHaveAttribute("href", mockFilePost.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("calls erase with 'FILE' and file id when Erase is clicked", () => {
    render(<P2PFileCard filePost={mockFilePost} erase={mockErase} />);

    fireEvent.click(screen.getByText("Erase"));
    expect(mockErase).toHaveBeenCalledWith("FILE", mockFilePost.id);
  });
});

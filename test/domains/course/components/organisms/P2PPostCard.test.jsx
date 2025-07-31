import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import P2PPostCard from "../../../../../src/domains/course/components/organisms/P2PPostCard";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("P2PPostCard component", () => {
  const testPost = {
    id: "testId",
    title: "Example title",
    description: "This is a description",
    url: "https://youtube.com",
    creationDate: new Date(),
  };

  const mockEdit = vi.fn();
  const mockErase = vi.fn();

  it("Renders correctly", async () => {
    render(<P2PPostCard post={testPost} />);
    const description = await screen.getByText("This is a description");
    const url = await screen.getByText("https://youtube.com");
    expect(description).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  it("Renders without icons", async () => {
    render(<P2PPostCard ed post={testPost} />);
    const buttons = await screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  it("Renders call edit correctly", async () => {
    render(<P2PPostCard edit={mockEdit} post={testPost} />);
    const buttons = await screen.queryAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(mockEdit).toHaveBeenCalled();
  });

  it("Renders call edit correctly", async () => {
    render(<P2PPostCard erase={mockErase} post={testPost} />);
    const buttons = await screen.queryAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(mockErase).toHaveBeenCalled();
  });
});

/* eslint-disable react/prop-types */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import P2PPostList from "../../../../../src/domains/course/components/organisms/P2PPostList";
import { useOutletContext as useOutletContextBase } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

vi.mock(
  "../../../../../src/domains/course/components/organisms/P2PPostCard",
  () => ({
    default: function MockCard({ post, edit, erase }) {
      return (
        <div data-testid="p2p-post-card">
          <span data-testid="card-title">{post.title}</span>
          <button data-testid="edit-btn" onClick={() => edit(post)}>
            edit
          </button>
          <button data-testid="erase-btn" onClick={() => erase(post.id)}>
            erase
          </button>
        </div>
      );
    },
  })
);

const useOutletContext = useOutletContextBase;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("P2PPostList", () => {
  it("renders one P2PPostCard per post", () => {
    const edit = vi.fn();
    const erase = vi.fn();
    const postList = [
      { id: "1", title: "Post A" },
      { id: "2", title: "Post B" },
      { id: "3", title: "Post C" },
    ];

    useOutletContext.mockReturnValue({ postList, edit, erase });

    render(<P2PPostList />);

    const cards = screen.getAllByTestId("p2p-post-card");
    expect(cards).toHaveLength(postList.length);

    postList.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });
});

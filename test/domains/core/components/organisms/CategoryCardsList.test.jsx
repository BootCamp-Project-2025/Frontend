/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { CategoryCardsList } from "../../../../../src/domains/core/componentes/organism/CategoryCardsList";

vi.mock("../../../../../src/shared/components/atoms/Slider", () => ({
  Slider: ({ children }) => <div data-testid="slider">{children}</div>,
}));

vi.mock("../../../../../src/shared/components/molecules/CategoryCard", () => ({
  CategoryCard: ({ imageURL, category }) => (
    <div data-testid="category-card">
      <img src={imageURL} alt="Category Image" />
      <p>{category}</p>
    </div>
  ),
}));

describe("CategoryCardsList component", () => {
  const mockCategories = [
    { id: "1", imageURL: "/img1.png", category: "Tech" },
    { id: "2", imageURL: "/img2.png", category: "Business" },
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCategories),
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches categories and renders them", async () => {
    render(<CategoryCardsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("category-card")).toHaveLength(
        mockCategories.length
      );
    });

    mockCategories.forEach(({ category }) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    expect(screen.getByTestId("slider")).toBeInTheDocument();
  });
});

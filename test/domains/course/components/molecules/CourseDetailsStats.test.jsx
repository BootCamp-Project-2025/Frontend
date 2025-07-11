/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseDetailsStats } from "../../../../../src/domains/course/components/molecules/CourseDetailsStats";

vi.mock("../../../../../src/shared/components/molecules/RatingStars", () => ({
  RatingStars: ({ rating }) => <div data-testid="rating-stars">{rating}</div>,
}));

describe("CourseDetailsStats", () => {
  it("should render RatingStars with the correct rating", () => {
    render(<CourseDetailsStats rating={4.5} raters={10} students={5} />);
    const ratingStars = screen.getByTestId("rating-stars");
    expect(ratingStars).toHaveTextContent("4.5");
  });

  it("should render ratings count link with correct text and href", () => {
    render(<CourseDetailsStats rating={4} raters={12} students={5} />);
    const ratingsLink = screen.getByRole("link", { name: "(12 Ratings)" });
    expect(ratingsLink).toBeInTheDocument();
    expect(ratingsLink).toHaveAttribute("href", "#reviewsSection");
  });

  it("should render students count with plural 's' when students > 1", () => {
    render(<CourseDetailsStats students={3} />);
    expect(screen.getByText("3 Students")).toBeInTheDocument();
  });

  it("should render students count without plural 's' when students = 1", () => {
    render(<CourseDetailsStats students={1} />);
    expect(screen.getByText("1 Student")).toBeInTheDocument();
  });

  it("should use default props when none are provided", () => {
    render(<CourseDetailsStats />);
    expect(screen.getByTestId("rating-stars")).toHaveTextContent("0");
    expect(
      screen.getByRole("link", { name: "(0 Ratings)" })
    ).toBeInTheDocument();
    expect(screen.getByText("0 Students")).toBeInTheDocument();
  });
});

/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseDetailsReview } from "../../../../../src/domains/course/components/molecules/CourseDetailsReview";

vi.mock(
  "../../../../../src/shared/components/molecules/ExpandableText",
  () => ({
    ExpandableText: ({ text }) => <p>{text}</p>,
  })
);

vi.mock("../../../../../src/shared/components/molecules/RatingStars", () => ({
  RatingStars: ({ rating }) => <div data-testid="rating-stars">{rating}</div>,
}));

describe("CourseDetailsReview", () => {
  const props = {
    avatarURL: "https://example.com/avatar.jpg",
    name: "John Doe",
    rating: 4,
    comment: "This is a great course!",
    dateReview: "2025-07-08",
  };

  it("should render image with correct src and alt", () => {
    render(<CourseDetailsReview {...props} />);
    const img = screen.getByAltText("teacher image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", props.avatarURL);
  });

  it("should display the reviewer name", () => {
    render(<CourseDetailsReview {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });

  it("should render RatingStars with correct rating prop", () => {
    render(<CourseDetailsReview {...props} />);
    const ratingStars = screen.getByTestId("rating-stars");
    expect(ratingStars).toHaveTextContent(String(props.rating));
  });

  it("should display the review date", () => {
    render(<CourseDetailsReview {...props} />);
    expect(screen.getByText(props.dateReview)).toBeInTheDocument();
  });

  it("should render the comment text", () => {
    render(<CourseDetailsReview {...props} />);
    expect(screen.getByText(props.comment)).toBeInTheDocument();
  });

  it("should use default props if none are provided", () => {
    render(<CourseDetailsReview />);
    expect(screen.getByAltText("teacher image")).toBeInTheDocument();
    expect(screen.getByText("Name reviewer")).toBeInTheDocument();
    expect(screen.getByTestId("rating-stars")).toHaveTextContent("0");
    expect(screen.getByText("00/00/00")).toBeInTheDocument();
    expect(screen.getByText("comment")).toBeInTheDocument();
  });
});

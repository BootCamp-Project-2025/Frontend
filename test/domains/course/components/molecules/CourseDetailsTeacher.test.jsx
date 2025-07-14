/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CourseDetailsTeacher } from "../../../../../src/domains/course/components/molecules/CourseDetailsTeacher";

vi.mock(
  "../../../../../src/shared/components/molecules/ExpandableText",
  () => ({
    ExpandableText: ({ text }) => <p>{text}</p>,
  })
);

vi.mock("../../../../../src/shared/components/atoms/Icon", () => ({
  Icon: ({ icon }) => <svg data-testid={`icon-${icon}`}></svg>,
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("CourseDetailsTeacher", () => {
  const props = {
    avatarURL: "https://example.com/avatar.jpg",
    name: "Jane Doe",
    rating: 4.8,
    students: 1234,
    courses: 12,
    aboutMe: "Experienced React teacher",
    teacherId: "abc123",
  };

  it("renders image with correct src and alt", () => {
    renderWithRouter(<CourseDetailsTeacher {...props} />);
    const img = screen.getByAltText("teacher image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", props.avatarURL);
  });

  it("renders links with correct href", () => {
    renderWithRouter(<CourseDetailsTeacher {...props} />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", `/teachers/${props.teacherId}`);
    });
  });

  it("renders teacher name", () => {
    renderWithRouter(<CourseDetailsTeacher {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });

  it("renders rating, students and courses with icons", () => {
    renderWithRouter(<CourseDetailsTeacher {...props} />);

    expect(screen.getByText(`${props.rating} Rating`)).toBeInTheDocument();
    expect(screen.getByText(`${props.students} Students`)).toBeInTheDocument();
    expect(screen.getByText(`${props.courses} Courses`)).toBeInTheDocument();

    expect(screen.getByTestId("icon-star")).toBeInTheDocument();
    expect(screen.getByTestId("icon-group")).toBeInTheDocument();
    expect(screen.getByTestId("icon-liveTv")).toBeInTheDocument();
  });

  it("renders aboutMe text via ExpandableText", () => {
    renderWithRouter(<CourseDetailsTeacher {...props} />);
    expect(screen.getByText(props.aboutMe)).toBeInTheDocument();
  });

  it("uses default props when none provided", () => {
    renderWithRouter(<CourseDetailsTeacher />);
    expect(screen.getByAltText("teacher image")).toBeInTheDocument();
    expect(screen.getByText("Teacher Name")).toBeInTheDocument();
    expect(screen.getByText("0 Rating")).toBeInTheDocument();
    expect(screen.getByText("0 Students")).toBeInTheDocument();
    expect(screen.getByText("0 Courses")).toBeInTheDocument();
    expect(screen.getByText("Teacher About me")).toBeInTheDocument();
  });
});

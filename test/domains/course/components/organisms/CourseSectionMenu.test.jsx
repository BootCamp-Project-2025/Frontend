// CourseSectionMenu.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseSectionMenu } from "../../../../../src/domains/course/components/organisms/CourseSectionMenu";

describe("CourseSectionMenu", () => {
  it("renders input, dropdowns and buttons", () => {
    render(<CourseSectionMenu />);

    expect(
      screen.getByPlaceholderText("Search your courses")
    ).toBeInTheDocument();
    expect(screen.getAllByText("search")[0]).toBeInTheDocument();
    expect(screen.getAllByText("All Courses")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Newest")[0]).toBeInTheDocument();
    expect(screen.getAllByText("New Course")[0]).toBeInTheDocument();
  });
  it("calls searchCourses with correct data when search button is clicked", () => {
    const mockSearch = vi.fn();
    render(<CourseSectionMenu searchCourses={mockSearch} />);

    const input = screen.getByPlaceholderText("Search your courses");
    const button = screen.getByText("search");

    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith({
      search: "React",
      filter: "all",
      sort: "newest",
    });
  });

  it("calls searchCourses with updated filter", () => {
    const mockSearch = vi.fn();
    render(<CourseSectionMenu searchCourses={mockSearch} />);

    const filterDropdown = screen.getAllByText("All Courses")[0];
    fireEvent.click(filterDropdown);
    fireEvent.click(screen.getByText("P2P Courses"));

    expect(mockSearch).toHaveBeenCalledWith({
      search: "",
      filter: "p2p",
      sort: "newest",
    });
  });

  it("calls searchCourses with updated sort", () => {
    const mockSearch = vi.fn();
    render(<CourseSectionMenu searchCourses={mockSearch} />);

    const sortDropdown = screen.getAllByText("Newest")[0];
    fireEvent.click(sortDropdown);
    fireEvent.click(screen.getByText("Name (Z–A)"));

    expect(mockSearch).toHaveBeenCalledWith({
      search: "",
      filter: "all",
      sort: "des",
    });
  });

  it("calls onNewCourse when 'New Course' button is clicked", () => {
    const mockNewCourse = vi.fn();
    render(<CourseSectionMenu onNewCourse={mockNewCourse} />);

    const newCourseBtn = screen.getByText("New Course");
    fireEvent.click(newCourseBtn);

    expect(mockNewCourse).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CourseModule from "../../../../../src/domains/course/components/organisms/CourseModule";
import Module from "../../../../../src/domains/course/classes/Module";

vi.mock(
  "../../../../../src/domains/course/components/organisms/SyllabusExpansionWrapper",
  () => ({
    default: ({ children }) => (
      <div data-testid={`SyllabusExpansionWrapper`}>{children}</div>
    ),
  })
);
vi.mock(
  "../../../../../src/domains/course/components/organisms/CourseLesson",
  () => ({
    default: ({ id }) => <div data-testid={`course-${id}`} />,
  })
);

beforeEach(() => vi.clearAllMocks());

describe("CourseModule test component", () => {
  const dispatch = vi.fn();
  it("renders correctly", () => {
    render(
      <CourseModule
        moduleIndex={0}
        dispatch={dispatch}
        modules={[Module.builder().position(0).title("testTitle").build()]}
      />
    );
    expect(screen.getByTestId("SyllabusExpansionWrapper")).toBeInTheDocument();
  });
  it("adds a lesson correctly", () => {
    render(
      <CourseModule
        moduleIndex={0}
        dispatch={dispatch}
        modules={[Module.builder().position(0).title("testTitle").build()]}
      />
    );
    const addLessonButton = screen.getByText("Lesson");
    addLessonButton.click();
    expect(dispatch).toHaveBeenCalled();
  });
});

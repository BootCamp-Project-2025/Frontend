import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CourseSyllabus from "../../../../../src/domains/course/components/organisms/CourseSyllabus";

vi.mock("react-router-dom", () => ({
  useParams: () => ({ courseId: "course-123" }),
}));

vi.mock("../../../../../src/domains/course/api/ApiGet", () => ({
  ApiGet: vi.fn().mockResolvedValue({
    data: { data: [] },
  }),
}));

vi.mock("../../../../../src/domains/course/api/UseGet", () => ({
  UseGet: () => ({
    responseData: { data: { published: false } },
    loading: false,
    error: false,
  }),
}));

vi.mock(
  "../../../../../src/domains/course/components/organisms/CourseModule",
  () => ({
    default: ({ moduleIndex }) => (
      <div data-testid={`course-module-${moduleIndex || 0}`} />
    ),
  })
);

describe("CourseSyllabus test component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("adds a module in the middle of the list correctly", async () => {
    render(<CourseSyllabus />);

    const addModuleEnd = screen.getByTestId("addModuleEnd");
    await userEvent.click(addModuleEnd);

    await waitFor(() => {
      expect(screen.getByTestId("addModule-0")).toBeInTheDocument();
    });

    const addModuleTop = screen.getByTestId("addModule-0");
    await userEvent.click(addModuleTop);

    await waitFor(() => {
      expect(screen.getByTestId("course-module-0")).toBeInTheDocument();
      expect(screen.getByTestId("course-module-1")).toBeInTheDocument();
    });
  });
});

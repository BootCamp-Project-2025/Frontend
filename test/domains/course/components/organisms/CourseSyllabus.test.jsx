import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CourseSyllabus from "../../../../../src/domains/course/components/organisms/CourseSyllabus";

describe("CourseSyllabus test component", () => {
  vi.mock("react-router-dom", () => ({
    useParams: () => ({ courseId: "course-123" }),
  }));

  vi.mock("../../../../../src/domains/course/api/ApiGet", () => ({
    ApiGet: vi.fn().mockResolvedValue({ data: [] }),
  }));

  vi.mock(
    "../../../../../src/domains/course/components/organisms/CourseModule",
    () => ({
      default: ({ id }) => <div data-testid={`course-${id}`} />,
    })
  );

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("renders correctly", () => {
    render(<CourseSyllabus />);
    expect(screen.getByText("Syllabus")).toBeInTheDocument();
  });
  it("add a module at the end of the list correctly", async () => {
    render(<CourseSyllabus />);
    const saveModuleButton = screen.getByTestId("addModuleEnd");
    saveModuleButton.click(saveModuleButton);
    render().rerender();
    expect(screen.getByTestId("course-module-0")).toBeInTheDocument();
  });
  it("add a module at the end of the list correctly", async () => {
    render(<CourseSyllabus />);
    const saveModuleButton = screen.getByTestId("addModuleEnd");
    saveModuleButton.click(saveModuleButton);
    render().rerender();
    const saveModuleButtonTop = screen.getByTestId("addModule-0");
    saveModuleButtonTop.click(saveModuleButton);
    render().rerender();
    expect(screen.getByTestId("course-module-0")).toBeInTheDocument();
    expect(screen.getByTestId("course-module-1")).toBeInTheDocument();
  });
});

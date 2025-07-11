import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CourseLesson from "../../../../../src/domains/course/components/organisms/CourseLesson";
import Module from "../../../../../src/domains/course/classes/Module";
import Lesson from "../../../../../src/domains/course/classes/Lesson";

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const openPopupMock = vi.fn();
const closePopupMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: () => ({ courseId: "course-123" }),
}));

vi.mock("../../../../../src/shared/components/molecules/UploadModal", () => ({
  UploadModal: (modalOpen) => (
    <div className={`${modalOpen ? "" : "hidden"}`} data-testid="uploadFile" />
  ),
}));

vi.mock("../../../../../src/shared/components/molecules/TextEditor", () => ({
  TextEditor: () => <div data-testid={"textEditor"} />,
}));

vi.mock("../../../../../src/shared/hooks/usePopup", () => ({
  default: () => ({
    openPopup: openPopupMock,
    closePopup: closePopupMock,
  }),
}));

describe("CourseLesson test component", () => {
  const dispatch = vi.fn();

  const modules = [
    Module.builder()
      .position(0)
      .lessons([
        Lesson.builder().position(0).title("testTitle").position(0).build(),
      ])
      .build(),
  ];
  it("renders correctly", () => {
    render(
      <CourseLesson
        lessonIndex={0}
        moduleIndex={0}
        dispatch={dispatch}
        modules={modules}
      />
    );
    expect(screen.getByTestId("textEditor")).toBeInTheDocument();
  });
  it("calls  add resource correctly", () => {
    render(
      <CourseLesson
        lessonIndex={0}
        moduleIndex={0}
        dispatch={dispatch}
        modules={modules}
      />
    );
    const addResourceButton = screen.getByText("Resource");
    addResourceButton.click();
    render().rerender();
    expect(screen.getByTestId("uploadFile")).toBeInTheDocument();
  });
  it("calls  add video correctly", () => {
    render(
      <CourseLesson
        lessonIndex={0}
        moduleIndex={0}
        dispatch={dispatch}
        modules={modules}
      />
    );
    const addResourceButton = screen.getByText("Video Content");
    addResourceButton.click();
    render().rerender();
    expect(openPopupMock).toHaveBeenCalled();
  });
});

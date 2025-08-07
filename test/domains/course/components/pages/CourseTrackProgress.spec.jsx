import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import * as ApiGetModule from "../../../../../src/domains/course/api/ApiGet";
import CourseTrackProgress from "../../../../../src/domains/course/components/pages/CourseTrackProgres";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock(
  "../../../../../src/domains/course/components/templates/CourseContentVisualizer",
  () => ({
    default: () => <div data-testid="mock-visualizer" />,
  })
);

vi.mock(
  "../../../../../src/domains/course/components/templates/CourseContentTrackBar",
  () => ({
    default: () => <div data-testid="mock-trackbar" />,
  })
);

vi.mock(
  "../../../../../src/domains/course/api/ApiGet",
  async () => await import("../../../../../src/domains/course/api/ApiGet")
);

let mockUseGetEnrollment;

vi.mock(
  "../../../../../src/domains/course/customHooks/useGetEnrollment",
  () => ({
    useGetEnrollment: () => mockUseGetEnrollment(),
  })
);

describe("CourseTrackProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ courseId: "123" });
  });

  it("should show loading and then render content on success", async () => {
    mockUseGetEnrollment = () => ({
      enrollment: { id: "123" },
      loading: false,
      error: null,
    });

    vi.spyOn(ApiGetModule, "ApiGet").mockResolvedValue({
      data: {
        data: {
          courseName: "Test Course",
          progress: 0.5,
          modules: [
            {
              title: "Module 1",
              lessons: [
                {
                  id: "lesson1",
                  title: "Lesson 1",
                  description: "desc",
                  videos: [{ url: "video1.mp4" }],
                  resources: [{ url: "res1.pdf", name: "PDF" }],
                  progress: {
                    videoProgresses: [],
                    resourcesCompleted: [],
                    completed: false,
                    trackId: "track1",
                    enrollmentId: "enroll1",
                  },
                },
              ],
            },
          ],
        },
      },
      error: null,
    });

    render(<CourseTrackProgress />);

    expect(
      screen.getByText(/No course content available/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("mock-visualizer")).toBeInTheDocument()
    );
    expect(screen.getByTestId("mock-trackbar")).toBeInTheDocument();
  });

  it("should show error message if ApiGet fails", async () => {
    mockUseGetEnrollment = () => ({
      enrollment: { id: "123" },
      loading: false,
      error: null,
    });

    vi.spyOn(ApiGetModule, "ApiGet").mockResolvedValue({
      data: null,
      error: true,
    });

    render(<CourseTrackProgress />);
    expect(
      screen.getByText(/No course content available/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText(/failed to load course progress/i)
      ).toBeInTheDocument()
    );
  });
});

import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { useEnrollments } from "../../../../src/domains/course/customHooks/useEnrollments";
import { baseAPI } from "../../../../src/shared/api/axios/AxiosConnection";

vi.mock("../../../../src/shared/api/axios/AxiosConnection", () => ({
  baseAPI: {
    get: vi.fn(),
  },
}));

const mockEnrollments = [
  { id: "e1", courseId: "c1", createdAt: "2024-01-01", status: "ACTIVE" },
  { id: "e2", courseId: "c2", createdAt: "2024-02-01", status: "CANCELED" },
];

const mockCourses = {
  c1: {
    data: {
      data: {
        id: "c1",
        name: "Course 1",
        description: "Desc 1",
        imgSrc: "/img1.png",
        author: "Author 1",
        rating: 4.5,
      },
    },
  },
  c2: {
    data: {
      data: {
        id: "c2",
        name: "Course 2",
        description: "Desc 2",
        imgSrc: "/img2.png",
        author: "Author 2",
        rating: 4.0,
      },
    },
  },
};

describe("useEnrollments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns enrollments correctly", async () => {
    baseAPI.get
      .mockResolvedValueOnce({ data: { data: mockEnrollments } })
      .mockResolvedValueOnce(mockCourses.c1)
      .mockResolvedValueOnce(mockCourses.c2);

    const { result } = renderHook(() => useEnrollments("user-123"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(false);
    expect(result.current.enrollments).toHaveLength(1);

    expect(result.current.enrollments[0]).toMatchObject({
      enrollmentId: "e1",
      courseId: "c1",
      name: "Course 1",
      description: "Desc 1",
      author: "Author 1",
      imageURL: "/img1.png",
      rating: 4.5,
      enrollmentDate: "2024-01-01",
      status: "ACTIVE",
    });
  });

  it("handles API error", async () => {
    baseAPI.get.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useEnrollments("user-123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(true);
    expect(result.current.enrollments).toBe(null);
  });
});

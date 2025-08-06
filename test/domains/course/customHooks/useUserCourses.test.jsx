// tests/useUserCourses.test.jsx
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { baseAPI } from "../../../../src/shared/api/axios/AxiosConnection";
import { useUserCourses } from "../../../../src/domains/course/customHooks/useUserCourses";

vi.mock("../../../../src/shared/api/axios/AxiosConnection", () => ({
  baseAPI: {
    get: vi.fn(),
  },
}));

describe("useUserCourses", () => {
  const mockCourses = [
    {
      id: "1",
      name: "Course 1",
      description: "Description",
      imgSrc: "/image.png",
      category: "Programming",
      subCategory: "Web",
      language: "English",
      field: "Frontend",
      time: 10,
      requirements: "Basic JS",
      userId: "user123",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and parse courses correctly", async () => {
    baseAPI.get.mockResolvedValueOnce({
      data: { data: mockCourses },
    });

    const { result } = renderHook(() => useUserCourses("user123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(null);
    expect(result.current.courses).toHaveLength(1);
    expect(result.current.courses[0]).toMatchObject({
      id: "1",
      name: "Course 1",
      description: "Description",
      imgSrc: "/image.png",
    });
  });

  it("should handle errors", async () => {
    baseAPI.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useUserCourses("user123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.courses).toBe(null);
  });

  it("should not fetch if no userId is provided", async () => {
    const { result } = renderHook(() => useUserCourses(null));

    expect(result.current.loading).toBe(true);
    expect(baseAPI.get).not.toHaveBeenCalled();
  });
});

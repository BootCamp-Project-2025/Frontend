import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { baseAPI } from "../../../../src/shared/api/axios/AxiosConnection";
import { useCheckEnrollment } from "../../../../src/domains/course/customHooks/useCheckEnrollment";

vi.mock("../../../../src/shared/api/axios/AxiosConnection", () => ({
  baseAPI: {
    get: vi.fn(),
  },
}));

describe("useCheckEnrollment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return isEnrolled true if the response is successful and status is not CANCELED", async () => {
    baseAPI.get.mockResolvedValueOnce({
      data: {
        data: {
          isEnrolled: true,
          enrollment: { status: "ENROLLED" },
        },
      },
    });

    const { result } = renderHook(() => useCheckEnrollment("123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isEnrolled).toBe(true);
    expect(result.current.error).toBe(false);
  });

  it("should return isEnrolled false and error false if the response is 404", async () => {
    const error404 = {
      response: { status: 404 },
    };
    baseAPI.get.mockRejectedValueOnce(error404);

    const { result } = renderHook(() => useCheckEnrollment("123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isEnrolled).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it("should handle errors other than 404", async () => {
    const someError = new Error("Some error");
    someError.response = { status: 500 };
    baseAPI.get.mockRejectedValueOnce(someError);

    const { result } = renderHook(() => useCheckEnrollment("123"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isEnrolled).toBe(null);
    expect(result.current.error).toEqual(
      expect.objectContaining({ message: "Some error" })
    );
  });

  it("should not call the API if courseId is falsy", () => {
    renderHook(() => useCheckEnrollment(null));
    expect(baseAPI.get).not.toHaveBeenCalled();
  });
});

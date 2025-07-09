import { describe, expect, vi, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StaticCourseHomePageForm from "../../../../src/domains/course/components/organisms/StaticCourseHomePageForm";
import * as useGetModule from "../../../../src/domains/course/api/UseGet";

const CourseData = {
  id: "adad9f6e-b2f8-46bc-b089-12a0511dec3f",
  name: "Curso de TypeScript",
  description: "Aprende a usar TypeScript en proyectos reales1",
  imgSrc: "https://example.com/img.png1",
  category: "Biology",
  subCategory: "tech",
  language: "French",
  field: "General1",
  time: 401,
  requirements: "None1",
};

const searchParams = { get: vi.fn() };

searchParams.get.mockReturnValue("");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [searchParams],
  };
});

describe("test for static course home page", async () => {
  it("exist", () => {
    expect(StaticCourseHomePageForm).toBeDefined();
  });
  it("renders correctry", () => {
    const response = {
      responseData: { data: CourseData },
      loading: false,
      error: false,
      status: 200,
    };
    vi.spyOn(useGetModule, "UseGet").mockReturnValue(response);
    render(<StaticCourseHomePageForm />);
    expect(screen.getByText("Home page course")).toBeInTheDocument();
  });
  it("doesnt render due to loading request", () => {
    const response = {
      data: {},
      loading: true,
      error: false,
      status: 200,
    };
    vi.spyOn(useGetModule, "UseGet").mockReturnValue(response);
    render(<StaticCourseHomePageForm />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });
  it("doesnt render due to error in request", () => {
    const response = {
      data: {},
      loading: false,
      error: true,
      status: 400,
    };
    vi.spyOn(useGetModule, "UseGet").mockReturnValue(response);
    render(<StaticCourseHomePageForm />);
    expect(screen.getByText("data couldnt be loadedd")).toBeInTheDocument();
  });
});

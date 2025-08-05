import { render, screen } from "@testing-library/react";
import RequestCard from "../../../../../src/domains/teacher/components/molecules/RequestCard.jsx";
import { describe, it, expect } from "vitest";

describe("RequestCard", () => {
  const request = {
    title: "Math Tutoring",
    deadline: "2024-07-01",
    description: "Need help with calculus homework and exam prep.",
    student: "John Doe",
  };

  it("renders the request title", () => {
    render(<RequestCard request={request} />);
    expect(screen.getByText(request.title)).toBeInTheDocument();
  });

  it("renders the request description", () => {
    render(<RequestCard request={request} />);
    expect(screen.getByText(request.description)).toBeInTheDocument();
  });

  it("renders the student name", () => {
    render(<RequestCard request={request} />);
    expect(screen.getByText(request.student)).toBeInTheDocument();
  });
});

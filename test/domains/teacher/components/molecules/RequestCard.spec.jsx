import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RequestCard from "../../../../../src/domains/teacher/components/molecules/RequestCard.jsx";
import { describe, it, expect } from "vitest";

describe("RequestCard", () => {
  const request = {
    title: "Math Tutoring",
    deadline: "2024-07-01",
    description: "Need help with calculus homework and exam prep.",
    createdAt: "2024-06-01T12:00:00Z",
  };
  it("renders the request title", () => {
    render(
      <BrowserRouter>
        <RequestCard request={request} />
      </BrowserRouter>
    );
  });
  it("renders the request description", () => {
    render(
      <BrowserRouter>
        <RequestCard request={request} />
      </BrowserRouter>
    );
  });
  it("renders the student name", () => {
    render(
      <BrowserRouter>
        <RequestCard request={request} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(new Date(request.createdAt).toLocaleDateString())
    ).toBeInTheDocument();
  });
});

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GridAccountDetail from "../../../../../src/domains/student/components/molecules/GridAccountDetail";
import { formatDate } from "../../../../../src/shared/utils/formatDate";
import { formatRoles } from "../../../../../src/shared/utils/formatRoles";

describe("GridAccountDetail", () => {
  const mockUser = {
    roles: ["user", "admin"],
    createdAt: "2025-01-01T12:00:00Z",
  };

  const mockCoursesCompleted = 7;

  it("renders all RowDetail sections with correct values", () => {
    render(
      <GridAccountDetail
        user={mockUser}
        coursesCompleted={mockCoursesCompleted}
      />
    );

    // Section: Account created
    const formattedDate = formatDate(mockUser.createdAt);
    expect(screen.getByText("Account created:")).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Section: Account type
    const formattedRoles = formatRoles(mockUser.roles).join(", ");
    expect(screen.getByText("Account type:")).toBeInTheDocument();
    expect(screen.getByText(formattedRoles)).toBeInTheDocument();

    // Section: Courses completed
    expect(screen.getByText("Courses completed:")).toBeInTheDocument();
    expect(
      screen.getByText(mockCoursesCompleted.toString())
    ).toBeInTheDocument();
  });
});

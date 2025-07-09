import { render, screen } from "@testing-library/react";
import CertificationCard from "../../../../src/domains/teacher/components/molecules/CertificationCard";
import { describe, it, expect } from "vitest";

describe("CertificationCard", () => {
  const defaultProps = {
    id: "cert-1",
    certification: "React Developer",
    institution: "OpenAI University",
    year: 2023,
  };

  it("renders certification title and institution", () => {
    render(<CertificationCard {...defaultProps} />);

    expect(screen.getByText("React Developer - 2023")).toBeInTheDocument();
    expect(screen.getByText("OpenAI University")).toBeInTheDocument();
  });
});

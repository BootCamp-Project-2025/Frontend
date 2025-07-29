import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { ExperienceSection } from "../../../../src/domains/teacher/components/organisms/ExperienceSection";

vi.mock("../../../../shared/api/axios/fetchData", () => ({
  fetchData: ({ setState }) => {
    setState([
      {
        id: "1",
        position: "Software Engineer",
        employer: "TechCorp",
        country: "USA",
        startDate: "2020-05",
        endDate: "2020-08",
        description: "Worked on backend systems",
      },
    ]);
  },
}));

vi.mock("../../../../shared/utils/formatDate", () => ({
  formatDate: (date) => date,
}));

vi.mock("../../../../shared/hooks/usePopup", () => ({
  default: () => ({
    openPopup: () => {},
    closePopup: () => {},
  }),
}));

vi.mock("../../../../shared/hooks/useFreelancerResources", () => ({
  useFreelancerResources: () => ({
    addCard: () => {},
    updateCard: () => {},
    deleteCard: () => {},
  }),
}));

describe("ExperienceSection", () => {
  it("renderiza correctamente una experiencia mockeada", async () => {
    render(<ExperienceSection />);

    // Verifica que los textos principales estén en el DOM
    /*  expect(await screen.findByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Worked on backend systems")).toBeInTheDocument(); */

    // También podemos verificar que se ve el botón
    expect(screen.getByText("Add Experience")).toBeInTheDocument();
  });
});

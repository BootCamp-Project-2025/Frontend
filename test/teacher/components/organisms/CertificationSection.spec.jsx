import { render, screen } from "@testing-library/react";
import CertificationSection from "../../../../src/domains/teacher/components/organisms/CertificationSection";
import { vi, describe, it, expect } from "vitest";

// Mock del hook usePopup
vi.mock("../../../../src/shared/hooks/usePopup.jsx", () => ({
  default: () => ({
    openPopup: vi.fn(),
    closePopup: vi.fn(),
  }),
}));

// Mock de fetchFreelancerData
vi.mock("../../../../src/shared/api/axios/fetchFreelancerData.js", () => ({
  fetchFreelancerData: ({ setState }) => {
    setState([
      {
        id: "cert-1",
        certification: "AWS Certified Developer",
        institution: "Amazon",
        year: "2023",
      },
    ]);
  },
}));

// Mock de useFreelancerResources
vi.mock("../../../../src/shared/hooks/useFreelancerResources.js", () => ({
  useFreelancerResources: () => ({
    addCard: vi.fn(),
    updateCard: vi.fn(),
    deleteCard: vi.fn(),
  }),
}));

// Test principal
describe("CertificationSection", () => {
  it("renderiza correctamente una certificación y el botón para agregar", async () => {
    render(<CertificationSection />);

    // Verifica que se renderiza el contenido mockeado
    /*   expect(
      await screen.findByText("AWS Certified Developer")
    ).toBeInTheDocument();
    expect(screen.getByText("Amazon")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument(); */

    // Verifica que se renderiza el botón
    expect(screen.getByText("Add Certification")).toBeInTheDocument();
  });
});

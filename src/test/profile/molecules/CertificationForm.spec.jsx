import { render, screen, fireEvent } from "@testing-library/react";
import CertificationForm from "../../../domains/profile/components/organisms/CertificationForm";
import { describe, it, expect, vi } from "vitest";

describe("CertificationForm", () => {
  const certification = {
    id: "1",
    name: "React Developer",
    year: 2023,
    institution: "OpenAI Academy",
  };

  const setup = (props = {}) => {
    const closePopup = vi.fn();
    const onSubmit = vi.fn();
    const onDelete = vi.fn();
    render(
      <CertificationForm
        closePopup={closePopup}
        certification={props.certification}
        onSubmit={onSubmit}
        onDelete={props.onDelete}
      />
    );
    return { closePopup, onSubmit, onDelete };
  };

  it("renders form title", () => {
    setup();
    expect(screen.getByText(/Certification Form/i)).toBeInTheDocument();
  });

  it("renders input fields with default values when certification is provided", () => {
    setup({ certification });
    expect(screen.getByLabelText(/Certification Name/i)).toHaveValue(
      certification.name
    );
    expect(screen.getByLabelText(/Institution/i)).toHaveValue(
      certification.institution
    );
    expect(screen.getByLabelText(/Year/i)).toHaveValue(certification.year);
  });

  it("renders empty input fields when certification is not provided", () => {
    setup();
    expect(screen.getByLabelText(/Certification Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Institution/i)).toHaveValue("");
    expect(screen.getByLabelText(/Year/i)).toHaveValue(null);
  });

  it("calls closePopup when close button is clicked", () => {
    const { closePopup } = setup();
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(closePopup).toHaveBeenCalled();
  });

  it("shows validation errors when submitting empty form", async () => {
    setup();
    fireEvent.click(screen.getByText(/Save/i));
    expect(
      await screen.findByText(/Certification name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Institution is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Year is required/i)).toBeInTheDocument();
  });

  it("calls onSubmit with form data and closes popup on submit", async () => {
    const { onSubmit, closePopup } = setup();
    fireEvent.change(screen.getByLabelText(/Certification Name/i), {
      target: { value: "NodeJS" },
    });
    fireEvent.change(screen.getByLabelText(/Institution/i), {
      target: { value: "Coursera" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: 2022 },
    });
    fireEvent.click(screen.getByText(/Save/i));
    await screen.findByDisplayValue("NodeJS");
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "NodeJS",
        institution: "Coursera",
        year: "2022",
        id: "",
      })
    );
    expect(closePopup).toHaveBeenCalled();
  });

  it("renders Delete button if onDelete and certification are provided", () => {
    setup({ certification, onDelete: vi.fn() });
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });

  it("does not render Delete button if onDelete is not provided", () => {
    setup({ certification });
    expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
  });

  it("calls onDelete with certification id when Delete button is clicked", () => {
    const onDelete = vi.fn();
    setup({ certification, onDelete });
    fireEvent.click(screen.getByText(/Delete/i));
    expect(onDelete).toHaveBeenCalledWith(certification.id);
  });
});

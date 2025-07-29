import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RowDetail from "../../../../../src/domains/student/components/atoms/RowDetail";

describe("RowDetail", () => {
  const onConfirmMock = vi.fn();

  const defaultProps = {
    title: "Nombre",
    value: "Juan",
    isEditable: true,
    onConfirm: onConfirmMock,
    valueFormat: "Escribí tu nombre",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el título y el valor correctamente", () => {
    render(<RowDetail {...defaultProps} />);
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
  });

  it("entra en modo edición al hacer click", () => {
    render(<RowDetail {...defaultProps} />);
    fireEvent.click(screen.getByText("Juan"));
    expect(
      screen.getByPlaceholderText("Escribí tu nombre")
    ).toBeInTheDocument();
  });

  it("permite editar el valor y confirmar", () => {
    render(<RowDetail {...defaultProps} />);
    fireEvent.click(screen.getByText("Juan"));
    const input = screen.getByPlaceholderText("Escribí tu nombre");
    fireEvent.change(input, { target: { value: "Carlos" } });

    const confirmButton = screen.getAllByRole("button")[1];
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledWith("Carlos");
  });

  it("permite cancelar la edición sin llamar a onConfirm", () => {
    render(<RowDetail {...defaultProps} />);
    fireEvent.click(screen.getByText("Juan"));
    const input = screen.getByPlaceholderText("Escribí tu nombre");
    fireEvent.change(input, { target: { value: "Carlos" } });

    const cancelButton = screen.getAllByRole("button")[0];
    fireEvent.click(cancelButton);

    expect(onConfirmMock).not.toHaveBeenCalled();
    expect(screen.getByText("Juan")).toBeInTheDocument();
  });

  it("no permite edición si isEditable es false", () => {
    render(<RowDetail {...defaultProps} isEditable={false} />);
    fireEvent.click(screen.getByText("Juan"));
    expect(
      screen.queryByPlaceholderText("Escribí tu nombre")
    ).not.toBeInTheDocument();
  });
});

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import * as usePopupModule from "../../../../src/shared/hooks/usePopup";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import CertificationSection from "../../../../src/domains/teacher/components/organisms/CertificationSection";

vi.mock(
  "../../../../src/domains/teacher/components/molecules/CertificationCard",
  () => ({
    default: ({ certification, onEdit }) => (
      <div data-testid="cert-card">
        <span>{certification.name}</span>
        {onEdit && <button onClick={() => onEdit(certification)}>Edit</button>}
      </div>
    ),
  })
);

vi.mock("../../../../src/shared/components/atoms/Button", () => ({
  // eslint-disable-next-line react/prop-types
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock(
  "../../../../src/domains/teacher/components/molecules/CertificationForm",
  () => ({
    default: () => <div>CertificationForm</div>,
  })
);

describe("CertificationSection", () => {
  let openPopupMock, closePopupMock;

  const mockCertifications = [
    {
      id: "1",
      name: "Certification 1",
      institution: "ABC",
      year: 2015,
    },
    {
      id: "2",
      name: "Certification 2",
      institution: "DEF",
      year: 2017,
    },
  ];

  beforeEach(() => {
    openPopupMock = vi.fn();
    closePopupMock = vi.fn();
    vi.spyOn(usePopupModule, "default").mockReturnValue({
      openPopup: openPopupMock,
      closePopup: closePopupMock,
    });

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockCertifications),
        })
      )
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders the list of certifications", async () => {
    render(<CertificationSection />);
    await waitFor(() => {
      expect(screen.getAllByTestId("cert-card")).toHaveLength(2);
    });
    expect(screen.getByText("Certification 1")).toBeInTheDocument();
    expect(screen.getByText("Certification 2")).toBeInTheDocument();
  });

  it("opens add certification popup when Add Certification button is clicked", async () => {
    render(<CertificationSection />);
    await waitFor(() =>
      fireEvent.click(screen.getByText(/Add Certification/i))
    );
    expect(openPopupMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        title: expect.any(String),
        onClose: closePopupMock,
        children: expect.any(Object),
      }),
      true
    );
  });

  it("opens edit certification popup when Edit is clicked", async () => {
    render(<CertificationSection />);
    await waitFor(() => fireEvent.click(screen.getAllByText("Edit")[0]));
    expect(openPopupMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        children: expect.any(Object),
        onClose: closePopupMock,
        title: expect.any(String),
      }),
      true
    );
  });

  it("adds a new certification when onAddCertification is called", async () => {
    render(<CertificationSection />);
    await waitFor(() => screen.getByText(/Add Certification/i));
    fireEvent.click(screen.getByText(/Add Certification/i));

    const onSubmit = openPopupMock.mock.calls[0][1].children.props.onSubmit;
    await act(async () => {
      await onSubmit({
        name: "New Cert",
        institution: "XYZ",
        year: 2020,
      });
    });

    expect(screen.getByText(/New Cert/)).toBeInTheDocument();
    expect(screen.getAllByTestId("cert-card")).toHaveLength(3);
  });

  it("edits a certification when onEditCertification is called", async () => {
    render(<CertificationSection />);
    await waitFor(() => fireEvent.click(screen.getAllByText("Edit")[0]));
    const onSubmit = openPopupMock.mock.calls[0][1].children.props.onSubmit;

    await act(async () => {
      await onSubmit({
        id: "1",
        name: "Updated Cert",
        institution: "ABC",
        year: 2015,
      });
    });

    expect(screen.getByText(/Updated Cert/)).toBeInTheDocument();
    expect(screen.queryByText("Certification 1")).not.toBeInTheDocument();
  });

  it("deletes a certification when onDeleteCertification is called", async () => {
    render(<CertificationSection />);
    await waitFor(() => fireEvent.click(screen.getAllByText("Edit")[0]));
    const onDelete = openPopupMock.mock.calls[0][1].children.props.onDelete;

    await act(async () => {
      await onDelete("1");
    });

    expect(screen.queryByText("Certification 1")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("cert-card")).toHaveLength(1);
  });
});

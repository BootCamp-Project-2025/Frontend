import PropTypes from "prop-types";
import CertificationCard from "../molecules/CertificationCard";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import CertificationForm from "../molecules/CertificationForm";

export default function CertificationList() {
  // TODO: Replace with actual data fetching logic
  const [certifications, setCertifications] = useState([
    { id: "1", name: "Certification 1", institution: "ABC", year: 2015 },
    { id: "2", name: "Certification 2", institution: "DEF", year: 2015 },
    { id: "3", name: "Certification 3", institution: "GHI", year: 2015 },
  ]);

  const { openPopup, closePopup } = usePopup();

  const handleOpenNewCertificationPopup = (certification) => {
    openPopup(
      CertificationForm,
      { closePopup, onSubmit: onAddCertification, certification },
      true
    );
  };

  const handleOpenEditCertificationPopup = (certification) => {
    openPopup(
      CertificationForm,
      {
        closePopup,
        onSubmit: onEditCertification,
        onDelete: onDeleteCertification,
        certification,
      },
      true
    );
  };

  const onEditCertification = (certification) => {
    //TODO: Here update certification logic
    setCertifications((prevCertifications) =>
      prevCertifications.map((c) =>
        c.id === certification.id ? certification : c
      )
    );
  };

  const onAddCertification = (certification) => {
    //TODO: Here add certification logic
    setCertifications((prevCertifications) => [
      ...prevCertifications,
      {
        id: Math.random().toString(36).substr(2, 9),
        ...certification,
      },
    ]);
  };

  const onDeleteCertification = (certificationId) => {
    // TODO: Here delete certification logic
    setCertifications((prevCertifications) =>
      prevCertifications.filter((c) => c.id !== certificationId)
    );
  };

  return (
    <div className="flex flex-col border border-blue-500 rounded-3xl w-full p-4 gap-4">
      <h2 className="font-bold text-2xl text-blue-500">Certifications</h2>
      <div className="flex flex-col gap-4">
        {certifications &&
          certifications.map((certification, index) => (
            <CertificationCard
              key={index}
              certification={certification}
              onEdit={() => handleOpenEditCertificationPopup(certification)}
            />
          ))}
      </div>
      <Button
        classname="self-start text-white font-medium"
        styleType="addBtn"
        onClick={() => handleOpenNewCertificationPopup()}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 0C9.81494 0 10.117 0.125111 10.3397 0.347811C10.5624 0.57051 10.6875 0.872555 10.6875 1.1875V8.3125H17.8125C18.1274 8.3125 18.4295 8.43761 18.6522 8.66031C18.8749 8.88301 19 9.18506 19 9.5C19 9.81494 18.8749 10.117 18.6522 10.3397C18.4295 10.5624 18.1274 10.6875 17.8125 10.6875H10.6875V17.8125C10.6875 18.1274 10.5624 18.4295 10.3397 18.6522C10.117 18.8749 9.81494 19 9.5 19C9.18506 19 8.88301 18.8749 8.66031 18.6522C8.43761 18.4295 8.3125 18.1274 8.3125 17.8125V10.6875H1.1875C0.872555 10.6875 0.57051 10.5624 0.347811 10.3397C0.125111 10.117 0 9.81494 0 9.5C0 9.18506 0.125111 8.88301 0.347811 8.66031C0.57051 8.43761 0.872555 8.3125 1.1875 8.3125H8.3125V1.1875C8.3125 0.872555 8.43761 0.57051 8.66031 0.347811C8.88301 0.125111 9.18506 0 9.5 0Z"
            fill="white"
          />
        </svg>
        Add Certification
      </Button>
    </div>
  );
}

CertificationList.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      name: PropTypes.string,
      acreditedBy: PropTypes.string,
    })
  ).isRequired,
};

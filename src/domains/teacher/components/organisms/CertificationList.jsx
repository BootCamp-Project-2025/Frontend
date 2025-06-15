import PropTypes from "prop-types";
import CertificationCard from "../molecules/CertificationCard";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import CertificationForm from "../molecules/CertificationForm";
import Icon from "../atoms/Icon";

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
        <Icon icon="add" className="w-5 h-5" />
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

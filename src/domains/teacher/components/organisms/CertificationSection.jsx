import { useEffect, useState } from "react";
import CertificationCard from "../molecules/CertificationCard";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import CertificationForm from "../molecules/CertificationForm";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { ProfileSection } from "../molecules/ProfileSection";
import { PopupFormLayout } from "../atoms/PopupFormLayout";

export default function CertificationSection() {
  const [recordList, setRecordList] = useState([
    {
      id: "1",
      name: "Certification 1",
      institution: "Frontend Masters",
      year: 2020,
    },
    {
      id: "2",
      name: "Certification 2",
      institution: "Oracle Academy",
      year: 2019,
    },
    // {
    //   id: "3",
    //   name: "Docker for Developers",
    //   institution: "Udemy",
    //   year: 2021,
    // },
  ]);
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    // fetch("/requestCertifications.json")
    //   .then((res) => res.json())
    //   .then((data) => setRecordList(data))
    //   .catch((err) => console.error("Error loading data:", err));
  }, []);

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Certification Form",
        children: (
          <CertificationForm onSubmit={addCard} closePopup={closePopup} />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (certification) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Certification Form",
        children: (
          <CertificationForm
            id={certification.id}
            name={certification.name}
            institution={certification.institution}
            year={certification.year}
            onSubmit={updateCard}
            onDelete={removeCard}
            closePopup={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const addCard = (certification) => {
    setRecordList((prev) => [
      ...prev,
      { ...certification, id: crypto.randomUUID() },
    ]);
    closePopup();
  };

  const updateCard = (certification) => {
    setRecordList((prev) =>
      prev.map((c) => (c.id === certification.id ? certification : c))
    );
    closePopup();
  };

  const removeCard = (certificationId) => {
    setRecordList((prev) => prev.filter((c) => c.id !== certificationId));
    closePopup();
  };

  return (
    <ProfileSection title="Certifications">
      <div className="flex flex-col gap-4">
        {recordList.map((cert) => (
          <CertificationCard
            key={cert.id}
            certification={cert}
            onEdit={(selected) => handleOpenEditPopup(selected)}
          />
        ))}
      </div>
      <div>
        <Button onClick={handleOpenPopup}>
          <Icon icon="add" className="w-4 h-4" />
          Add Certification
        </Button>
      </div>
    </ProfileSection>
  );
}

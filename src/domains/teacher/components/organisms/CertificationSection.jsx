import { useEffect, useState } from "react";
import CertificationCard from "../molecules/CertificationCard";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import CertificationForm from "../molecules/CertificationForm";
import { ProfileSection } from "../molecules/ProfileSection";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import { fetchFreelancerData } from "../../../../shared/api/axios/fetchFreelancerData";
import { getFreelancerResource } from "../../../../shared/api/freelancers/getFreelancerResource";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";
import PropTypes from "prop-types";
export default function CertificationSection({ freelancerId }) {
  const [recordList, setRecordList] = useState([]);

  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    fetchFreelancerData({
      method: getFreelancerResource,
      args: [freelancerId, "certifications"],
      setState: setRecordList,
      onSuccess: (data) => console.log("Certifications received:", data),
      onError: (err) => console.error("Fetch failed:", err),
    });
  }, []);

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Certification Form",
        children: (
          <CertificationForm addCard={addCard} closePopup={closePopup} />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (cert) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Certification Form",
        children: (
          <CertificationForm
            id={cert.id}
            certification={cert.certification}
            institution={cert.institution}
            year={cert.year}
            updateCard={updateCard}
            closePopup={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenDeletePopup = (cert) => {
    openPopup(
      DeleteCardPopup,
      { deleteAction: deleteCard, id: cert.id, closePopup },
      true
    );
  };

  const editCard = (certId) => {
    const cert = recordList.find((e) => e.id === certId);
    if (cert) handleOpenEditPopup(cert);
  };

  const { addCard, updateCard, deleteCard } = useFreelancerResources({
    freelancerId,
    resourceType: "certifications",
    recordList,
    setRecordList,
    closePopup,
    openEditPopup: handleOpenEditPopup,
  });

  return (
    <ProfileSection title="Certifications">
      <div className="flex flex-col gap-4">
        {recordList
          .filter((cert) => cert && cert.id)
          .map((cert) => (
            <CertificationCard
              key={cert.id}
              id={cert.id}
              certification={cert.certification}
              institution={cert.institution}
              year={cert.year}
              editCard={editCard}
              deleteCard={handleOpenDeletePopup}
            />
          ))}
      </div>
      <div>
        <Button
          onClick={handleOpenPopup}
          variant="ghost"
          className="border border-[color:var(--color-primary-600)]"
        >
          <span className="material-symbols-outlined">add</span>
          Add Certification
        </Button>
      </div>
    </ProfileSection>
  );
}

CertificationSection.propTypes = {
  freelancerId: PropTypes.string,
};

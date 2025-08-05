import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import { Button } from "../../../../shared/components/atoms/Button";
import { LanguageCard } from "../molecules/LanguageCard";
import { LanguageForm } from "./LanguageForm";
import { fetchData } from "../../../../shared/api/axios/fetchData";
import { getFreelancerResource } from "../../../../shared/api/freelancers/getFreelancerResource";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";
import PropTypes from "prop-types";

export const LanguageSection = ({ freelancerId }) => {
  const [recordList, setRecordList] = useState([]);

  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    fetchData({
      method: getFreelancerResource,
      args: [freelancerId, "languages"],
      setState: setRecordList,
    });
  }, []);

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Add Language",
        dropdown: true,
        children: <LanguageForm addCard={addCard} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleEditPopup = (lang) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Edit Language",
        dropdown: true,
        children: (
          <LanguageForm
            id={lang.id}
            name={lang.name}
            level={lang.level}
            updateCard={updateCard}
            closeForm={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenDeletePopup = (lang) => {
    openPopup(
      DeleteCardPopup,
      { deleteAction: deleteCard, id: lang.id, closePopup },
      true
    );
  };

  const editCard = (cardId) => {
    const lang = recordList.find((l) => l.id === cardId);
    if (lang) handleEditPopup(lang);
  };

  const { addCard, updateCard, deleteCard } = useFreelancerResources({
    freelancerId,
    resourceType: "languages",
    recordList: recordList,
    setRecordList: setRecordList,
    closePopup,
    openEditPopup: handleEditPopup,
  });

  return (
    <ProfileSection title="Languages">
      <div className="space-y-2">
        {recordList.map((lang) => (
          <LanguageCard
            key={lang.id}
            id={lang.id}
            name={lang.name}
            level={lang.level}
            editCard={editCard}
            deleteCard={() => handleOpenDeletePopup(lang)}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button
          variant="ghost"
          onClick={handleOpenPopup}
          className="border border-[color:var(--color-primary-600)]"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Language</span>
        </Button>
      </div>
    </ProfileSection>
  );
};
LanguageSection.propTypes = {
  freelancerId: PropTypes.string,
};

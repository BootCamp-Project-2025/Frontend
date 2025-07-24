import { useState, useEffect } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import { ProfileSection } from "../molecules/ProfileSection";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import SkillCard from "../molecules/SkillCard";
import { SkillForm } from "./SkillForm";
import { fetchData } from "../../../../shared/api/axios/fetchData";
import { getFreelancerResource } from "../../../../shared/api/freelancers/getFreelancerResource";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";
import PropTypes from "prop-types";

export default function SkillSection({ freelancerId }) {
  const [recordList, setRecordList] = useState([]);

  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    fetchData({
      method: getFreelancerResource,
      args: [freelancerId, "skills"],
      setState: (data) =>
        setRecordList(
          data.map((skill) => ({
            id: skill.skillId,
            name: skill.name,
            level: skill.level,
          }))
        ),
    });
  }, []);

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Skill Form",
        children: <SkillForm addCard={addCard} closePopup={closePopup} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (skill) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Skill Form",
        children: (
          <SkillForm
            id={skill.id}
            skill={skill}
            updateCard={updateCard}
            closePopup={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenDeletePopup = (skill) => {
    openPopup(
      DeleteCardPopup,
      {
        deleteAction: deleteCard,
        id: skill.id,
        closePopup,
      },
      true
    );
  };

  const editCard = (cardId) => {
    const record = recordList.find((r) => r.id === cardId);
    if (record) {
      handleOpenEditPopup(record);
    }
  };

  const { addCard, updateCard, deleteCard } = useFreelancerResources({
    freelancerId,
    resourceType: "skills",
    recordList,
    setRecordList,
    closePopup,
    openEditPopup: handleOpenEditPopup,
  });

  return (
    <ProfileSection title="Skills">
      <>
        {recordList.map((data, index) => (
          <SkillCard
            key={index}
            id={data.id}
            name={data.name}
            level={data.level}
            editCard={editCard}
            deleteCard={handleOpenDeletePopup}
          />
        ))}
        <div>
          <Button
            onClick={handleOpenPopup}
            variant="ghost"
            className="border border-[color:var(--color-primary-600)]"
          >
            <span className="material-symbols-outlined">add</span>
            Add Skill
          </Button>
        </div>
      </>
    </ProfileSection>
  );
}

SkillSection.propTypes = {
  freelancerId: PropTypes.string,
};

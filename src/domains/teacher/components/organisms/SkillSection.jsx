import { useState, useEffect } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import { ProfileSection } from "../molecules/ProfileSection";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import SkillCard from "../molecules/SkillCard";
import { SkillForm } from "./SkillForm";

export default function SkillSection() {
  const { openPopup, closePopup } = usePopup();

  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    setRecordList([
      { id: crypto.randomUUID(), skill: "React", level: "Intermediate" },
      { id: crypto.randomUUID(), skill: "Node", level: "Beginner" },
    ]);
  }, []);

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Skill Form",
        children: (
          <SkillForm
            closePopup={closePopup}
            addCard={addCard}
            updateCard={updateCard}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (skillData) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Skill Form",
        children: (
          <SkillForm
            id={skillData.id}
            skillObject={skillData}
            closePopup={closePopup}
            addCard={addCard}
            updateCard={updateCard}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenDeletePopup = (data) => {
    openPopup(
      DeleteCardPopup,
      {
        id: data.id,
        closePopup,
        deleteAction: deleteCard,
      },
      true
    );
  };

  const addCard = (newSkill) => {
    const record = { ...newSkill, id: crypto.randomUUID() };
    setRecordList((prev) => [...prev, record]);
    closePopup();
  };

  const updateCard = (updatedSkill) => {
    setRecordList((prev) =>
      prev.map((item) => (item.id === updatedSkill.id ? updatedSkill : item))
    );
    closePopup();
  };

  const editCard = (cardId) => {
    const record = recordList.find((r) => r.id === cardId);
    if (record) {
      handleOpenEditPopup(record);
    }
  };

  const deleteCard = (cardId) => {
    setRecordList((prev) => prev.filter((item) => item.id !== cardId));
    closePopup();
  };

  return (
    <ProfileSection title="Skills">
      <>
        {recordList.map((data) => (
          <SkillCard
            key={data.id}
            id={data.id}
            skill={data.skill}
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

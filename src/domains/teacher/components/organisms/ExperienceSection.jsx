/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { ExperienceForm } from "./ExperienceForm";
import { Button } from "../../../../shared/components/atoms/Button";
import { ExperienceCard } from "../molecules/ExperienceCard";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";

export const ExperienceSection = () => {
  const [recordList, setRecordList] = useState([]);
  const [cardSelected, setCardSelected] = useState(null);

  useEffect(() => {
    fetch("/requestExperience.json")
      .then((res) => res.json())
      .then((data) => setRecordList(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Experience Form",
        children: <ExperienceForm addCard={addCard} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (information) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Experience Form",
        children: (
          <ExperienceForm
            id={information.id}
            jobPosition={information.jobPosition}
            employer={information.employer}
            country={information.country}
            description={information.description}
            startDate={information.startDate}
            endDate={information.endDate}
            updateCard={updateCard}
            removeCard={removeCard}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const addCard = (record) => {
    setRecordList((prev) => [...prev, record]);
    closePopup();
  };

  const updateCard = (record) => {
    setRecordList((prev) =>
      prev.map((element) => {
        if (element.id == record.id) {
          return record;
        }
        return element;
      })
    );
    closePopup();
  };

  const editCard = (cardId) => {
    const record = recordList.find((e) => e.id == cardId);
    if (record) {
      setCardSelected(record);
      handleOpenEditPopup(record);
    }
  };

  const removeCard = (cardId) => {
    setRecordList((prev) => prev.filter((e) => e.id !== cardId));
    closePopup();
  };

  return (
    <>
      <ProfileSection title={"Experience"}>
        <>
          {recordList.map((exp) => (
            <ExperienceCard
              key={exp.id}
              id={exp.id}
              jobPosition={exp.jobPosition}
              employer={exp.employer}
              country={exp.country}
              startDate={exp.startDate}
              endDate={exp.endDate}
              description={exp.description}
              editCard={editCard}
            />
          ))}
          <div>
            <Button onClick={handleOpenPopup}>
              <span className="material-symbols-outlined">add</span>
              Add Experience
            </Button>
          </div>
        </>
      </ProfileSection>
    </>
  );
};

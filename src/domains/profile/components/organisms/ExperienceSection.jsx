import { useEffect, useState } from "react";

import { ExperienceForm } from "./ExperienceForm";
import { ExperienceCard } from "../molecules/ExperienceCard";
import { ButtonProfileAddCard } from "../atoms/ButtonProfileAddCard";
import { DialogContainer } from "../../../../shared/components/atoms/DialogContainer";
import { ProfileSection } from "../molecules/ProfileSection";

export const ExperienceSection = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [recordList, setRecordList] = useState([]);
  const [cardSelected, setCardSelected] = useState(null);

  useEffect(() => {
    fetch("/requestExperience.json")
      .then((res) => res.json())
      .then((data) => setRecordList(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  const addCard = (record) => {
    setRecordList((prev) => [...prev, record]);
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
  };

  const editCard = (cardId) => {
    const record = recordList.find((e) => e.id == cardId);
    if (record) {
      setCardSelected(record);
      setFormVisible(true);
    }
  };

  const removeCard = (cardId) => {
    setRecordList((prev) => prev.filter((e) => e.id !== cardId));
  };

  const closeForm = () => {
    setFormVisible(false);
    setCardSelected(null);
  };

  return (
    <>
      <div className="p-4">
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
              <ButtonProfileAddCard onClick={() => setFormVisible(true)}>
                Add Experience
              </ButtonProfileAddCard>
            </div>
          </>
        </ProfileSection>
      </div>

      <DialogContainer
        isOpen={formVisible}
        onClose={() => {
          closeForm();
        }}
      >
        <div className="px-7 py-7 flex flex-col max-h-[85vh] max-w-[90vw]  w-200 overflow-y-auto">
          {formVisible && (
            <ExperienceForm
              addCard={addCard}
              closeForm={closeForm}
              updateCard={updateCard}
              removeCard={removeCard}
              {...cardSelected}
            />
          )}
        </div>
      </DialogContainer>
    </>
  );
};

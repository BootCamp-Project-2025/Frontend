import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { EducationCard } from "../molecules/EducationCard";
import { DialogContainer } from "../../../../shared/components/atoms/DialogContainer";
import { EducationForm } from "./EducationForm";
import { Button } from "../../../../shared/components/atoms/Button";

export const EducationSection = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [recordList, setRecordList] = useState([]);
  const [cardSelected, setCardSelected] = useState(null);

  useEffect(() => {
    fetch("/requestEducation.json")
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
        <ProfileSection title={"Education"}>
          <>
            {recordList.map((data) => (
              <EducationCard
                key={data.id}
                id={data.id}
                university={data.university}
                career={data.career}
                startDate={data.startDate}
                endDate={data.endDate}
                editCard={editCard}
              />
            ))}
            <div>
              <Button
                styleType="addBtn"
                classname="text-white fill-white"
                onClick={() => setFormVisible(true)}
              >
                <span className="material-symbols-outlined">add</span>
                <p>Add Education</p>
              </Button>
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
            <EducationForm
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

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
                <svg className="h-4" viewBox="0 0 19 19">
                  <path
                    fill="currentFill"
                    d="M9.5 0C9.81494 0 10.117 0.125111 10.3397 0.347811C10.5624 0.57051 10.6875 0.872555 10.6875 1.1875V8.3125H17.8125C18.1274 8.3125 18.4295 8.43761 18.6522 8.66031C18.8749 8.88301 19 9.18506 19 9.5C19 9.81494 18.8749 10.117 18.6522 10.3397C18.4295 10.5624 18.1274 10.6875 17.8125 10.6875H10.6875V17.8125C10.6875 18.1274 10.5624 18.4295 10.3397 18.6522C10.117 18.8749 9.81494 19 9.5 19C9.18506 19 8.88301 18.8749 8.66031 18.6522C8.43761 18.4295 8.3125 18.1274 8.3125 17.8125V10.6875H1.1875C0.872555 10.6875 0.57051 10.5624 0.347811 10.3397C0.125111 10.117 0 9.81494 0 9.5C0 9.18506 0.125111 8.88301 0.347811 8.66031C0.57051 8.43761 0.872555 8.3125 1.1875 8.3125H8.3125V1.1875C8.3125 0.872555 8.43761 0.57051 8.66031 0.347811C8.88301 0.125111 9.18506 0 9.5 0Z"
                  />
                </svg>
                <p>Add Experience</p>
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

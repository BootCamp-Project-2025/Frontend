/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { EducationCard } from "../molecules/EducationCard";
import { EducationForm } from "./EducationForm";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";

export const EducationSection = () => {
  const [recordList, setRecordList] = useState([]);
  //const [cardSelected, setCardSelected] = useState(null);

  useEffect(() => {
    fetch("/requestEducation.json")
      .then((res) => res.json())
      .then((data) => setRecordList(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Education Form",
        children: <EducationForm addCard={addCard} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenEditPopup = (information) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Education Form",
        children: (
          <EducationForm
            id={information.id}
            university={information.university}
            career={information.career}
            startDate={information.startDate}
            endDate={information.endDate}
            updateCard={updateCard}
            closeForm={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const handleOpenDeletePopup = (information) => {
    openPopup(
      DeleteCardPopup,
      { deleteAction: deleteCard, id: information.id, closePopup },
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
      handleOpenEditPopup(record);
    }
  };

  const deleteCard = (cardId) => {
    setRecordList((prev) => prev.filter((e) => e.id !== cardId));
    closePopup();
  };

  return (
    <>
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
              deleteCard={handleOpenDeletePopup}
            />
          ))}
          <div>
            <Button
              onClick={handleOpenPopup}
              variant="ghost"
              className={"border border-[color:var(--color-primary-600)]"}
            >
              <span className="material-symbols-outlined">add</span>
              Add Education
            </Button>
          </div>
        </>
      </ProfileSection>
    </>
  );
};

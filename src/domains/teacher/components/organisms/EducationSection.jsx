import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { EducationCard } from "../molecules/EducationCard";
import { EducationForm } from "./EducationForm";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import { getFreelancerResource } from "../../../../shared/api/freelancers/getFreelancerResource";
import { fetchData } from "../../../../shared/api/axios/fetchData";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";
import { formatDate } from "../../../../shared/utils/formatDate";
import PropTypes from "prop-types";

export const EducationSection = ({ freelancerId }) => {
  const [recordList, setRecordList] = useState([]);

  const { openPopup, closePopup } = usePopup();
  useEffect(() => {
    fetchData({
      method: getFreelancerResource,
      args: [freelancerId, "educations"],
      setState: setRecordList,
    });
  }, []);

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
    let startDateFormat = formatDate(information.startDate);
    let endDateFormat = formatDate(information.finishDate);
    openPopup(
      PopupFormLayout,
      {
        title: "Education Form",
        children: (
          <EducationForm
            id={information.id}
            university={information.university}
            career={information.career}
            startDate={startDateFormat}
            finishDate={endDateFormat}
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

  const editCard = (cardId) => {
    const record = recordList.find((e) => e.id == cardId);
    if (record) {
      handleOpenEditPopup(record);
    }
  };

  const { deleteCard, addCard, updateCard } = useFreelancerResources({
    freelancerId,
    resourceType: "educations",
    recordList,
    setRecordList,
    closePopup,
    openEditPopup: handleOpenEditPopup,
  });

  return (
    <>
      <ProfileSection title={"Education"}>
        <>
          {recordList.map((data, index) => {
            const startDate = formatDate(data.startDate);
            const finishDate = formatDate(data.finishDate);
            return (
              <EducationCard
                key={index}
                id={data.id}
                university={data.university}
                career={data.career}
                startDate={startDate}
                finishDate={finishDate}
                editCard={editCard}
                deleteCard={handleOpenDeletePopup}
              />
            );
          })}
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
EducationSection.propTypes = {
  freelancerId: PropTypes.string,
};

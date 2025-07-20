/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { ExperienceForm } from "./ExperienceForm";
import { Button } from "../../../../shared/components/atoms/Button";
import { ExperienceCard } from "../molecules/ExperienceCard";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import DeleteCardPopup from "../atoms/DeleteCardPopup";
import { fetchData } from "../../../../shared/api/axios/fetchData";
import { getFreelancerResource } from "../../../../shared/api/freelancers/getFreelancerResource";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";
import { formatDate } from "../../../../shared/utils/formatDate";
import PropTypes from "prop-types";

export const ExperienceSection = ({ freelancerId }) => {
  const [recordList, setRecordList] = useState([]);

  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    fetchData({
      method: getFreelancerResource,
      args: [freelancerId, "experiences"],
      setState: setRecordList,
    });
  }, []);

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
    let startDateFormat = formatDate(information.startDate);
    let endDateFormat = formatDate(information.endDate);

    openPopup(
      PopupFormLayout,
      {
        title: "Experience Form",
        children: (
          <ExperienceForm
            id={information.id}
            position={information.position}
            employer={information.employer}
            country={information.country}
            description={information.description}
            startDate={startDateFormat}
            endDate={endDateFormat}
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
    const record = recordList.find((e) => e.id === cardId);
    if (record) {
      handleOpenEditPopup(record);
    }
  };

  const { deleteCard, addCard, updateCard } = useFreelancerResources({
    freelancerId,
    resourceType: "experiences",
    recordList,
    setRecordList,
    closePopup,
    openEditPopup: handleOpenEditPopup,
  });

  return (
    <ProfileSection title={"Experience"}>
      <>
        {recordList.map((exp) => {
          const startDate = formatDate(exp.startDate);
          const endDate = formatDate(exp.endDate);

          return (
            <ExperienceCard
              key={exp.id}
              id={exp.id}
              position={exp.position}
              employer={exp.employer}
              country={exp.country}
              startDate={startDate}
              endDate={endDate}
              description={exp.description}
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
            Add Experience
          </Button>
        </div>
      </>
    </ProfileSection>
  );
};
ExperienceSection.propTypes = {
  freelancerId: PropTypes.string,
};

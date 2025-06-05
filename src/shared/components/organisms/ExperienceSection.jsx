import { useEffect, useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { ButtonProfileSection } from "../atoms/ButtonProfileSection";
import { DialogContainer } from "../atoms/DialogContainer";
import { ExperienceForm } from "./ExperienceForm";
import { ExperienceCard } from "../molecules/ExperienceCard";

export const ExperienceSection = () => {
  const [experienceFormVisible, setExperienceFormVisible] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [experienceCardSelected, setExperienceCardSelected] = useState(null);

  useEffect(() => {
    fetch("/requestExperience.json")
      .then((res) => res.json())
      .then((data) => setExperienceList(data))
      .catch((err) => console.error("Error loading experience data:", err));
  }, []);

  const addExperienceCard = (experience) => {
    setExperienceList((prev) => [...prev, experience]);
  };

  const updateExperienceCard = (experience) => {
    setExperienceList((prev) =>
      prev.map((element) => {
        if (element.id == experience.id) {
          return experience;
        }
        return element;
      })
    );
  };

  const editExperience = (cardId) => {
    const experience = experienceList.find((e) => e.id == cardId);
    if (experience) {
      setExperienceCardSelected(experience);
      setExperienceFormVisible(true);
    }
  };

  const removeExperience = (cardId) => {
    setExperienceList((prev) => prev.filter((e) => e.id !== cardId));
  };

  const closeExperienceForm = () => {
    setExperienceFormVisible(false);
    setExperienceCardSelected(null);
  };

  return (
    <>
      <div className="p-4">
        <ProfileSection title={"Experience"}>
          <>
            {experienceList.map((exp) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                jobPosition={exp.jobPosition}
                employer={exp.employer}
                country={exp.country}
                startDate={exp.startDate}
                endDate={exp.endDate}
                description={exp.description}
                editExperience={editExperience}
              />
            ))}
            <div>
              <ButtonProfileSection
                onClick={() => setExperienceFormVisible(true)}
              >
                Add Experience
              </ButtonProfileSection>
            </div>
          </>
        </ProfileSection>
      </div>

      <DialogContainer
        isOpen={experienceFormVisible}
        onClose={() => {
          closeExperienceForm();
        }}
      >
        <div className="px-7 py-7 flex flex-col max-h-[85vh] max-w-[90vw]  w-200 overflow-y-auto">
          {experienceFormVisible && (
            <ExperienceForm
              addExperienceCard={addExperienceCard}
              closeExperienceForm={closeExperienceForm}
              updateExperienceCard={updateExperienceCard}
              removeExperience={removeExperience}
              {...experienceCardSelected}
            />
          )}
        </div>
      </DialogContainer>
    </>
  );
};

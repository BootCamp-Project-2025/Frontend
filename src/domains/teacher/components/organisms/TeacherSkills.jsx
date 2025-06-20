import propTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import TeacherSkillRow from "../molecules/TeacherSkillRow";
import TeacherSkillPopup from "./TeacherSkillPopup";
import usePopup from "../../../../shared/hooks/usePopup";
import { useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import { PopupFormLayout } from "../atoms/PopupFormLayout";

function TeacherSkills() {
  const { openPopup, closePopup } = usePopup();
  //load data from API
  const [data, setData] = useState([
    { skill: "React", level: "Intermediate" },
    { skill: "React", level: "begginer" },
  ]);

  function addSkill(skill, newSkill, id) {
    if (newSkill) {
      data.push(skill);
      setData([...data]);
    } else {
      data[id] = skill;
      setData([...data]);
    }
  }

  function handleSkill(skill, id) {
    if (skill !== undefined) {
      openPopup(
        PopupFormLayout,
        {
          title: "Education Form",
          children: (
            <TeacherSkillPopup
              skillObject={skill}
              closePopup={closePopup}
              addSkill={addSkill}
              id={id}
            />
          ),
          onClose: closePopup,
        },
        true
      );
    } else {
      openPopup(
        PopupFormLayout,
        {
          title: "Education Form",
          children: (
            <TeacherSkillPopup closePopup={closePopup} addSkill={addSkill} />
          ),
          onClose: closePopup,
        },
        true
      );
    }
  }

  return (
    <>
      <ProfileSection title={"Education"}>
        {data.map((skill, index) => (
          <TeacherSkillRow
            key={index}
            level={skill.level}
            skill={skill.skill}
            onclick={() => handleSkill(skill, index)}
            id={index}
          />
        ))}
        <div>
          <Button onClick={() => handleSkill(undefined)}>
            <span className="material-symbols-outlined">add</span> Add Skill
          </Button>
        </div>
      </ProfileSection>
    </>
  );
}

export default TeacherSkills;

TeacherSkills.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
};

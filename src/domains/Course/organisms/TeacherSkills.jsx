import propTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";
import TeacherSkillRow from "../molecules/TeacherSkillRow";
import TeacherSkillPopup from "./TeacherSkillPopup";
import usePopup from "../../../shared/hooks/usePopup";

function TeacherSkills({ className = "", style = {} }) {
  const { openPopup, closePopup } = usePopup();
  //load data from API
  const data = [
    { skill: "react", level: "Intermediate" },
    { skill: "react", level: "begginer" },
  ];

  function handleSkill(skill) {
    if (skill) {
      openPopup(() =>
        TeacherSkillPopup({ closePopup: closePopup, skill: skill })
      );
    } else {
      openPopup(() => TeacherSkillPopup({ closePopup: closePopup }));
    }
  }

  return (
    <>
      <div
        className={`border-blue-500 min-w-fit  p-4 ${className} `}
        style={{ borderRadius: "14px", borderWidth: "1px", ...style }}
      >
        <p className="text-blue-500 font-bold">Skills</p>
        {data.map((skill, index) => (
          <TeacherSkillRow
            key={index}
            level={skill.level}
            skill={skill.skill}
            edit={() => handleSkill(skill)}
          />
        ))}

        <Button onClick={() => handleSkill()} styleType="callToAction">
          + Add Skill
        </Button>
      </div>
    </>
  );
}

export default TeacherSkills;

TeacherSkills.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
};

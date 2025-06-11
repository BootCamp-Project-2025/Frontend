import propTypes from "prop-types";
import InputSkillLabeled from "../molecules/InputSkillLabeled";
import SelectSkillLabeled from "../molecules/SelectSkillLabeled";

function TeacherSkillForm({ skill, update }) {
  const handleSkillInputChange = (e) =>
    update({ ...skill, skill: e.target.value });

  const changeLevel = (e) => update({ ...skill, level: e.target.value });
  return (
    <div className="flex gap-4 justify-center">
      <InputSkillLabeled
        onChange={handleSkillInputChange}
        value={skill.skill}
        className="flex-1/2"
      />
      <SelectSkillLabeled
        onChange={changeLevel}
        className="flex-1/2"
        value={skill.level}
      />
    </div>
  );
}

export default TeacherSkillForm;

TeacherSkillForm.propTypes = {
  skill: propTypes.object.isRequired,
  update: propTypes.func.isRequired,
};

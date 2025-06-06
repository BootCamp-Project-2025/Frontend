import propTypes from "prop-types";
import { Input } from "../../../shared/components/atoms/Input";

const textStyle = {
  fontSize: "18px",
};
function TeacherSkillForm({ skill, update }) {
  return (
    <div className="flex gap-4 justify-center">
      <div className="w-fit">
        <p style={textStyle}>Skills</p>
        <Input styleType="default" id={"skill"} type={"text"} />
      </div>
      <div className="w-fit">
        <p style={textStyle}>Proficiency</p>
        <select
          onChange={(e) => update({ ...skill, level: e.target.value })}
          className="border text-gray-600 p-1 rounded-md outline-none"
          type="select"
          value={skill.level}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
    </div>
  );
}

export default TeacherSkillForm;

TeacherSkillForm.propTypes = {
  skill: propTypes.object.isRequired,
  update: propTypes.func.isRequired,
};

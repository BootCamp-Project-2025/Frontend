import propTypes from "prop-types";
import Label from "../atoms/Label";
import SkillSelect from "../atoms/SkillSelect";

function SelectSkillLabeled({ onChange, value, className = "" }) {
  return (
    <div className={`w-fit ${className}`}>
      <Label>Proficiency</Label>
      <SkillSelect onChange={onChange} value={value} />
    </div>
  );
}

export default SelectSkillLabeled;

SelectSkillLabeled.propTypes = {
  value: propTypes.object.isRequired,
  className: propTypes.string,
  onChange: propTypes.func.isRequired,
};

import { Input } from "../../../shared/components/atoms/Input";
import Label from "../atoms/Label";
import propTypes from "prop-types";

function InputSkillLabeled({ onChange, value, className = "" }) {
  return (
    <div className={`w-fit ${className}`}>
      <Label>Skills</Label>
      <Input
        onChange={onChange}
        value={value}
        styleType="default"
        id={"skill"}
        type={"text"}
        classname="w-40"
      />
    </div>
  );
}

export default InputSkillLabeled;

InputSkillLabeled.propTypes = {
  value: propTypes.object.isRequired,
  className: propTypes.string,
  onChange: propTypes.func.isRequired,
};

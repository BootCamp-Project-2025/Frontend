import propTypes from "prop-types";
import Label from "../atoms/Label";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";

function SelectSkillLabeled({ onChange, value, className = "" }) {
  const proficiency = [
    { label: "Beginner" },
    { label: "Intermediate" },
    { label: "Advanced" },
  ];

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <Label>Proficiency</Label>
      <Dropdown
        label={value}
        variant="bordered"
        radius="small"
        options={proficiency}
        onSelect={onChange}
        color="secondary"
      ></Dropdown>
    </div>
  );
}

export default SelectSkillLabeled;

SelectSkillLabeled.propTypes = {
  value: propTypes.isRequired,
  className: propTypes.string,
  onChange: propTypes.func.isRequired,
};

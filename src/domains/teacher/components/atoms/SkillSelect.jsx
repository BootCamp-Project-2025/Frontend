import propTypes from "prop-types";

function SkillSelect({ onChange, value }) {
  return (
    <select
      onChange={onChange}
      className="border text-gray-600 p-1 rounded-md outline-none font-sans w-40"
      type="select"
      value={value}
    >
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
      <option value="Expert">Expert</option>
    </select>
  );
}

export default SkillSelect;

SkillSelect.propTypes = {
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

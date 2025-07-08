import propTypes from "prop-types";

function SkillSelect({ onChange, value }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="bg-white py-2 px-2.5 rounded-md outline-1 focus:outline-2 text-base outline-gray-300 focus:outline-blue-500"
      type="select"
      value={value}
    >
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  );
}

export default SkillSelect;

SkillSelect.propTypes = {
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

import propTypes from "prop-types";

function SkillSelect({ onChange, value }) {
  return (
    <select
      onChange={onChange}
      className="bg-white py-2 px-2.5 rounded-md outline-1 focus:outline-2 text-base outline-gray-300 focus:outline-blue-500"
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

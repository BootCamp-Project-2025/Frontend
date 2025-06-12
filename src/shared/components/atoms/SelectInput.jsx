import PropTypes from "prop-types";

export const SelectInput = ({ id, register, label, options, errorMessage }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="font-medium">
      {label}
    </label>
    <select id={id} {...register} className="mt-1 p-2 border rounded">
      <option value="">Select proficiency</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
  </div>
);

SelectInput.propTypes = {
  id: PropTypes.string,
  register: PropTypes.func,
  errorMessage: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
};

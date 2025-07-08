import PropTypes from "prop-types";
import clsx from "clsx"; // Si no tienes clsx puedes usar interpolación normal

export const SelectInput = ({
  id,
  register,
  value,
  onChange = () => {},
  label,
  options,
  placeHolder = "Select proficiency",
  errorMessage,
  className = "",
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="font-medium">
      {label}
    </label>
    <select
      id={id}
      {...register}
      value={value}
      onChange={onChange}
      className={clsx("mt-1 p-2 border rounded", className)}
    >
      <option value="">{placeHolder}</option>
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
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  options: PropTypes.array,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

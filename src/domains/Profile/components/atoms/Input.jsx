import PropTypes from "prop-types";

export default function Input({
  id,
  name,
  type,
  label,
  error,
  defaultValue,
  ...props
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-sm font-semibold text-[#252525]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={`w-full h-10 px-3 mt-1 text-sm border rounded-lg focus:outline-none   ${error ? "border-red-500 focus:ring-0" : "border-gray-300 focus:ring-blue-500 focus:ring-2"}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  props: PropTypes.object,
};

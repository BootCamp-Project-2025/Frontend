import PropTypes from "prop-types";

export const Input = ({
  type,
  name,
  id,
  placeholder = "",
  error = "",
  styleType = "",
}) => {
  const variantsStyle = {
    default: `border text-gray-600 p-1 rounded-md outline-none ${error ? "border-red-500" : "border-gray-400"}`,
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={variantClasses}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  styleType: PropTypes.string,
};

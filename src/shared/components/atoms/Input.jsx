import PropTypes from "prop-types";

const INPUT_STYLE_TYPES = {
  DEFAULT: "default",
};

export const Input = ({
  type,
  name,
  id,
  placeholder = "",
  error = "",
  styleType = "",
  classname = "",
}) => {
  const variantsStyle = {
    [INPUT_STYLE_TYPES.DEFAULT]: `border text-gray-600 p-1 rounded-md outline-none ${error ? "border-red-500" : "border-gray-400"}`,
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
      className={`${classname} ${variantClasses}`}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  styleType: PropTypes.oneOf(Object.values(INPUT_STYLE_TYPES)),
  classname: PropTypes.string,
};

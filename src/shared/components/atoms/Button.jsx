import PropTypes from "prop-types";
import "./button.css";

const BUTTON_STYLE_TYPES = {
  ADD: "addBtn",
  CALL_TO_ACTION: "callToAction",
  DELETE: "deleteBtn",
  EDIT: "editBtn",
  SEARCH: "searchBtn",
};

export const Button = ({
  children,
  styleType = "",
  classname = "",
  color = "blue",
  onClick = () => {},
}) => {
  const base = "flex items-center justify-center gap-2 cursor-pointer";

  const variantsStyle = {
    [BUTTON_STYLE_TYPES.ADD]: "px-4 py-2 font-bold rounded-xl text-black",
    [BUTTON_STYLE_TYPES.CALL_TO_ACTION]: "text-white py-1 px-5 font-semibold rounded-xl",
    [BUTTON_STYLE_TYPES.DELETE]: "bg-transparent border border-red-500 rounded-full p-2",
    [BUTTON_STYLE_TYPES.EDIT]: "text-white rounded-full p-2",
    [BUTTON_STYLE_TYPES.SEARCH]: "rounded-sm p-2 search",
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <button
      className={`button ${base} ${variantClasses} ${classname}`}
      style={{ backgroundColor: `var(--color-${color})` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  styleType: PropTypes.oneOf(Object.values(BUTTON_STYLE_TYPES)),
  classname: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

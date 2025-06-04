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
  color = "",
  onClick = () => {},
}) => {
  const base = "flex items-center justify-center gap-2 cursor-pointer";

  const variantsStyle = {
    [BUTTON_STYLE_TYPES.ADD]:
      "px-4 py-2 font-bold rounded-xl text-black bg-[#3b82f6]",
    [BUTTON_STYLE_TYPES.CALL_TO_ACTION]:
      "text-white py-1 px-5 font-semibold rounded-xl bg-[#3b82f6]",
    [BUTTON_STYLE_TYPES.DELETE]:
      "bg-transparent border border-red-500 rounded-[50%] p-2 bg-[#00000000]",
    [BUTTON_STYLE_TYPES.EDIT]: "text-white rounded-[50%] p-2 bg-[#f6af3b]",
    [BUTTON_STYLE_TYPES.SEARCH]: "rounded-sm p-2 search bg-[#3b82f6]",
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <button
      className={`button ${base} ${variantClasses} ${classname}`}
      style={color ? { backgroundColor: `var(--color-${color})` } : {}}
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

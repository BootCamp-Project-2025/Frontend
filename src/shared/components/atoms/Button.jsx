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
  const base =
    "flex items-center justify-center w-max gap-2 cursor-pointer hover:brightness-90 hover:duration-150 active:brightness-115 active:duration-150";

  const variantsStyle = {
    [BUTTON_STYLE_TYPES.ADD]: `px-4 py-2 font-bold rounded-xl text-black ${!color ? "bg-blue-500 hover:bg-blue-600" : ""}`,
    [BUTTON_STYLE_TYPES.CALL_TO_ACTION]: `text-white py-1 px-5 font-semibold rounded-xl ${!color ? "bg-blue-500 hover:bg-blue-600" : ""}`,
    [BUTTON_STYLE_TYPES.DELETE]: `bg-transparent border border-red-500 rounded-[50%] p-2 ${!color ? "bg-transparent" : ""}`,
    [BUTTON_STYLE_TYPES.EDIT]: `text-white rounded-[50%] p-2 ${!color ? "bg-orange-500 hover:bg-orange-600" : ""}`,
    [BUTTON_STYLE_TYPES.SEARCH]: `rounded-sm p-2 search ${!color ? "bg-blue-500 hover:bg-blue-600" : ""}`,
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  const COLOR_MAP = {
    blue: "bg-blue-500 hover:bg-blue-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    light: "bg-light-500 hover:bg-light-600",
    dark: "bg-dark-500 hover:bg-dark-600",
    green: "bg-green-500 hover:bg-green-600",
    violet: "bg-violet-500 hover:bg-violet-600",
    blueLight: "bg-blueLight-500 hover:bg-blueLight-600",
    pink: "bg-pink-500 hover:bg-pink-600",
  };

  const dynamicColorClass = color ? COLOR_MAP[color] : "";

  return (
    <button
      className={`button ${base} ${variantClasses} ${classname} ${dynamicColorClass}`}
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

import PropTypes from "prop-types";
import "./button.css";

export const Button = ({
  children,
  styleType = "",
  color = "blue",
  onClick = () => {},
}) => {
  const base = "button flex items-center justify-center gap-2 cursor-pointer";

  const variantsStyle = {
    addBtn: "px-4 py-2 font-bold rounded-xl text-black",
    callToAction: "text-white py-1 px-5 font-semibold rounded-xl",
    deleteBtn: "bg-transparent border border-red-500 rounded-full p-2",
    editBtn: "text-white rounded-full p-2",
    searchBtn: "rounded-sm p-2 search",
  };

  const variantClasses = variantsStyle[styleType]
    ? variantsStyle[styleType]
    : "";

  return (
    <button
      className={`${base} ${variantClasses}`}
      style={{ backgroundColor: `var(--color-${color})` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  styleType: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

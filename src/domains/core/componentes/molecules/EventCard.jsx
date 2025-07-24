import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const EventCard = ({
  children,
  path = "",
  color = "green",
  type = "bottom",
}) => {
  const borderColors = {
    yellow: "border-[color:var(--color-warning-300)]",
    green: "border-[color:var(--color-success-300)]",
    blue: "border-blue-500",
  };

  const borderColor = borderColors[color];

  return (
    <Link
      to={path}
      className={`${type === "bottom" ? "border-b-4" : "border-t-6"} ${borderColor} rounded-md mt-4 shadow-sm block transition-colors duration-200`}
    >
      {children}
    </Link>
  );
};

EventCard.propTypes = {
  path: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.children,
};

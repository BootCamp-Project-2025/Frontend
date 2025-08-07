import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

export const EventCard = ({
  children,
  id = "",
  color = "green",
  type = "bottom",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");

  const borderColors = {
    yellow: "border-[color:var(--color-warning-300)]",
    green: "border-[color:var(--color-success-300)]",
    blue: "border-blue-500",
  };

  const borderColor = borderColors[color];

  const handleNavigate = () => {
    if (id !== "") {
      const locationBegging = isTeacherRoute ? "/teacher" : "/student";
      navigate(locationBegging + "/chat", { state: { chatId: id } });
    }
  };

  return (
    <button
      onClick={handleNavigate}
      className={`${type === "bottom" ? "border-b-4" : "border-t-6"} ${borderColor} rounded-md mt-4 shadow-sm block transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

EventCard.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.children,
};

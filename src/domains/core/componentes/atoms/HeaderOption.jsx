import { Link, useLocation } from "react-router";
import PropTypes from "prop-types";

export const HeaderOption = ({ to, children, className = "" }) => {
  const lotation = useLocation();
  return (
    <Link
      className={`text-xl font-[700] hover:text-primary-500 ${className}`}
      style={{ color: lotation.pathname === to ? "var(--color-blue-500)" : "" }}
      to={to}
    >
      {children}
    </Link>
  );
};

HeaderOption.propTypes = {
  to: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
};

import { Link, useLocation } from "react-router";
import PropTypes from "prop-types";

export const HeaderOption = ({ to, children }) => {
  const lotation = useLocation();
  return (
    <Link
      className=" text-xl font-[700] hover:text-primary-500"
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
};

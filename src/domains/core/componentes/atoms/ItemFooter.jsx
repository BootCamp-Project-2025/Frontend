import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ItemFooter = ({ children, to = "#" }) => {
  return (
    <Link className="text-base text-gray-500 hover:bg-gray-100" to={to}>
      {children}
    </Link>
  );
};

ItemFooter.propTypes = {
  children: PropTypes.element,
  to: PropTypes.string,
};

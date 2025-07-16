import PropTypes from "prop-types";

export const Table = ({ children, type = "top" }) => {
  return <div className={`${type == top ? "" : ""}`}>{children}</div>;
};

Table.propTypes = {
  children: PropTypes.children,
  type: PropTypes.string,
};

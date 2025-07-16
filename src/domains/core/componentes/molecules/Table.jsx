import PropTypes from "prop-types";

export const Table = ({ children, type = "top", quantity = 1, classname = "" }) => {
  const grid = `sm:grid-cols-${quantity}`;
  return <div className={`${type == "top" ? "border-t-4" : "border-b-4"} ${classname} grid grid-cols-1 ${grid} rounded-lg border-blue-500 shadow-sm bg-white`}>{children}</div>;
};

Table.propTypes = {
  children: PropTypes.children,
  type: PropTypes.string,
  classname: PropTypes.string,
  quantity: PropTypes.number,
};

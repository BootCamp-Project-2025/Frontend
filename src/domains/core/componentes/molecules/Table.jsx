import PropTypes from "prop-types";

export const Table = ({ children, classname = "" }) => {
  return (
    <div
      className={`border-t-4 ${classname} border-blue-500 grid grid-cols-1 sm:grid-cols-3 rounded-lg shadow-sm bg-white`}
    >
      {children}
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.children,
  classname: PropTypes.string,
};

import PropTypes from "prop-types";

export const TableItem = ({ title, value }) => (
  <div className="flex flex-col items-center justify-between p-2 border border-gray-100 rounded-md h-22">
    <p className="text-gray-500 text-base text-center font-semibold">{title}</p>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

TableItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

import PropTypes from "prop-types";

export const TableItem = ({ title, value }) => (
  <div className="flex flex-col items-center justify-between p-2 border border-gray-200 h-22 bg-[color:var(--color-secondary-50)]">
    <p className="text-gray-500 text-base text-center font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-all">
      {title}
    </p>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

TableItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

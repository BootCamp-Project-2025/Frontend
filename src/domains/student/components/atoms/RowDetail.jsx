import PropTypes from "prop-types";
import React from "react";

const RowDetail = ({ title, value, border = true }) => {
  return (
    <div
      className={`${border && "border-[color:var(--color-default-100)] border-b"} grid grid-cols-2 p-2`}
    >
      <p className="font-medium">{title}:</p>
      <p className="text-[color:var(--color-default-800)] font-semibold">
        {value}
      </p>
    </div>
  );
};

export default RowDetail;

RowDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  border: PropTypes.bool,
};

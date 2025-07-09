import PropTypes from "prop-types";

export default function SmallAnotation({ className = "", children, ...props }) {
  return (
    <span
      style={{
        color: "#A3A3A3",
        fontSize: "12px",
        fontWeight: "300",
      }}
      className={`${className} m-0`}
      {...props}
    >
      {children}
    </span>
  );
}

SmallAnotation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

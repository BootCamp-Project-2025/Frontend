import propTypes from "prop-types";

const textStyle = {
  fontSize: "18px",
};

function Label({ children }) {
  return (
    <p className="text-gray-600  font-semibold text-lg" style={textStyle}>
      {children}
    </p>
  );
}

export default Label;

Label.propTypes = {
  children: propTypes.node.isRequired,
};

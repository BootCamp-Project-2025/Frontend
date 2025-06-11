import propTypes from "prop-types";

const textStyle = {
  fontSize: "18px",
};

function Label({ children }) {
  return (
    <p className="mb-1 font-sans" style={textStyle}>
      {children}
    </p>
  );
}

export default Label;

Label.propTypes = {
  children: propTypes.node.isRequired,
};

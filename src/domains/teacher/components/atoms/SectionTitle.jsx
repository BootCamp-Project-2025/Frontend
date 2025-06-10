import PropTypes from "prop-types";

export default function SectionTitle({ text }) {
  return <h2 className="text-blue-500 font-bold text-2xl">{text}</h2>;
}

SectionTitle.propTypes = {
  text: PropTypes.string,
};

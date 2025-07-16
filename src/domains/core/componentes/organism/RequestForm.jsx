import PropTypes from "prop-types";

export default function RequestForm({ closePopup }) {
  return <button onClick={closePopup}>close</button>;
}

RequestForm.propTypes = {
  closePopup: PropTypes.func,
};

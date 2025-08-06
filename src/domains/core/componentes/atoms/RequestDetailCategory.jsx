import PropTypes from "prop-types";

const RequestDetailCategory = ({ category }) => {
  return (
    <p className="py-3 px-6 bg-[var(--color-default-100)] text-[var(--color-default-800)] rounded-3xl text-sm">
      {category}
    </p>
  );
};

export default RequestDetailCategory;
RequestDetailCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

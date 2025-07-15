import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export const FilterChip = ({ label, onClick }) => {
  return (
    <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-secondary-600 bg-[#e7e7e7]">
      {label}
      <button onClick={onClick} className="outline-0">
        <Icon icon={"close"} className="text-secondary-600" />
      </button>
    </span>
  );
};

FilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

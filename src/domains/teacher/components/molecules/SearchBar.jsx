import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function SearchBar({ className, ...props }) {
  return (
    <div className={`flex border-1 border-gray-400 rounded-sm ${className}`}>
      <input {...props} className="w-full py-2 px-3 focus:outline-gray-400" />
      <button className="px-2 border-l-1 border-gray-400 hover:cursor-pointer">
        <Icon icon={"search"} />
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
};

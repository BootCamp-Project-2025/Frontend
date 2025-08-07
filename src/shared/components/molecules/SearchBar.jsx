import { Button } from "../atoms/Button";
import PropTypes from "prop-types";

export default function SearchBar({ className, seach, ...props }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <input
        data-testid="searchInput"
        {...props}
        className="bg-white outline-gray-300 w-full py-1.5 px-2.5 rounded-md outline-1 focus:outline-2 text-base focus:outline-blue-500"
      />
      <Button onClick={seach} type="submit">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "1.3rem" }}
        >
          search
        </span>
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  seach: PropTypes.func,
};

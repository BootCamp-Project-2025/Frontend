import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CourseBannerCategory = ({
  category = "Category",
  subCategory = "SubCategory",
}) => {
  return (
    <div className="flex gap-3 items-center text-primary-600">
      <Link className=" font-bold">{category}</Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="12px"
        viewBox="0 -960 960 960"
        width="12px"
        fill="currentColor"
      >
        <path d="M321-48 218-151l329-329-329-329 103-103 432 432L321-48Z" />
      </svg>
      <Link className=" font-bold">{subCategory}</Link>
    </div>
  );
};

CourseBannerCategory.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
};

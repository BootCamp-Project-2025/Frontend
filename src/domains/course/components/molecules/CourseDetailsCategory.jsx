import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon } from "../../../../shared/components/atoms/Icon";

export const CourseDetailsCategory = ({
  category = "Category",
  subCategory = "SubCategory",
}) => {
  return (
    <div className="flex gap-3 items-center text-primary-600">
      <Link className=" font-bold">{category}</Link>
      <Icon icon={"arrowForward"} className="h-[0.75rem] w-[0.75rem] "></Icon>
      <Link className=" font-bold">{subCategory}</Link>
    </div>
  );
};

CourseDetailsCategory.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
};

import { Card } from "../atoms/Card";
import PropTypes from "prop-types";

export const CategoryCard = ({
  imageURL = "/defaultCategoryImage.png",
  category = "Category",
  ...props
}) => {
  return (
    <>
      <Card
        radius="small"
        color="secondary"
        className="flex flex-col shrink-0 px-[0.5rem] py-[0.5rem] border-[1px] w-[9.81rem] h-[8.225rem] sm:w-[13.68rem] sm:h-[9.81rem] border-[#D9D9D9] gap-[0.875rem] hover:cursor-pointer transition hover:bg-gray-100"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        {...props}
      >
        <div className="overflow-hidden rounded-lg flex justify-center items-center flex-1 bg-gray-300 text-xs">
          <img src={imageURL} alt="Course Image" className="h-full w-full" />
        </div>
        <p className="text-sm text-center text-gray-900 line-clamp-1 font-medium">
          {category}
        </p>
      </Card>
    </>
  );
};

CategoryCard.propTypes = {
  imageURL: PropTypes.string,
  category: PropTypes.string,
};

import { Card } from "../atoms/Card";
import PropTypes from "prop-types";

export const CategoryCard = ({
  imageURL = "/defaultImage1.png",
  category = "Category",
  ...props
}) => {
  return (
    <>
      <Card
        className="border-gray-300 flex flex-col gap-2 hover:cursor-pointer hover:border-primary-500  w-[13.6875rem] min-w-[9.8125rem] "
        bordered
        borderWidth="thin"
        radius="small"
        color="secondary"
        shadow="custom"
        padding="sm"
        {...props}
      >
        <div className="overflow-hidden rounded-sm flex justify-center items-center aspect-[1/0.6] bg-gray-300 text-xs">
          <img src={imageURL} alt="Category Image" className="h-full w-full" />
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

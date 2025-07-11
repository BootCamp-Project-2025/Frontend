import { useNavigate } from "react-router-dom";
import { Card } from "../atoms/Card";
import PropTypes from "prop-types";

export const CategoryCard = ({
  // eslint-disable-next-line no-unused-vars
  id = "",
  imageURL = "/defaultImage1.png",
  category = "Category",
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        className="border-gray-300 bg-white flex flex-col gap-2 hover:cursor-pointer hover:border-primary-500 hover:bg-primary-50 w-[13.6875rem] min-w-[9.8125rem] "
        bordered
        borderWidth="thin"
        radius="small"
        color="secondary"
        shadow="custom"
        padding="sm"
        onClick={() => {
          navigate(`/courses?category=${category}`);
        }}
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
  id: PropTypes.string,
  imageURL: PropTypes.string,
  category: PropTypes.string,
};

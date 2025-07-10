import { Card } from "../atoms/Card";
import PropTypes from "prop-types";
import { Icon } from "../atoms/Icon";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({
  id = "idCourse",
  imageURL,
  name = "Course name",
  description = "Description course",
  rating = "0.0",
  author = "Author name",
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="border-gray-300 bg-white flex flex-col hover:cursor-pointer hover:border-primary-500 hover:bg-primary-50 gap-1.5"
      bordered
      borderWidth="thin"
      radius="small"
      color="secondary"
      shadow="custom"
      padding="md"
      onClick={() => {
        navigate(`/courses/${id}`);
      }}
      {...props}
    >
      <div className="overflow-hidden rounded-sm flex justify-center items-center bg-gray-300 text-xs aspect-[1/0.6]">
        <img src={imageURL} alt="Course Image" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-2 gap-2">
        <div className="flex gap-1">
          <p className="text-base font-bold text-gray-900 line-clamp-2 flex-1">
            {name}
          </p>
          <div className="flex justify-center items-start  p-0.5">
            <p className="text-xs font-normal text-gray-900 flex items-center gap-0.5">
              {rating}
              <Icon
                icon={"star"}
                className={"w-[1.5rem] h-[1.5rem] text-yellow-500"}
              ></Icon>
            </p>
          </div>
        </div>
        <p className="line-clamp-3 text-xs font-[500]  text-gray-900">
          {description}
        </p>
        <p className="line-clamp-1 text-xs uppercase font-[400]  text-gray-950 mt-auto">
          {author}
        </p>
      </div>
    </Card>
  );
};

CourseCard.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  rating: PropTypes.string,
};

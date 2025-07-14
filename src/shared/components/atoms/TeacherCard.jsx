import PropTypes from "prop-types";
import { Card } from "../atoms/Card";
import { Icon } from "./Icon";
import { useNavigate } from "react-router-dom";

export const TeacherCard = ({
  id = "idTeacher",
  imageURL = "",
  name = "Teacher name",
  rating = "0.0",
  description = "Description",
  skills = ["Ability 1", "Ability 1"],
  className = "",
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className={`border-gray-300 bg-white flex flex-col hover:cursor-pointer hover:border-primary-500 gap-2.5  hover:bg-primary-50  ${className}`}
      bordered
      borderWidth="thin"
      radius="small"
      color="secondary"
      shadow="none"
      padding="md"
      onClick={() => {
        navigate(`/teachers/${id}`);
      }}
      {...props}
    >
      <div className="flex flex-row  gap-2  items-center ">
        <img src={imageURL} alt="User image" className="h-6 w-6 rounded-full" />
        <p className="w-full text-base  text-gray-900  font-semibold line-clamp-1">
          {name}
        </p>
        <p className="text-xs font-normal text-gray-900 flex items-center gap-0.5">
          {rating}
          <Icon
            icon={"star"}
            className={"w-[1.5rem] h-[1.5rem] text-yellow-500"}
          ></Icon>
        </p>
      </div>
      <p className="line-clamp-3 text-xs font-[500]  text-gray-900">
        {description}
      </p>
      <div className="flex gap-2.5 mt-auto flex-wrap">
        {skills.map((skill, index) => {
          return (
            <p
              className="text-xs py-[0.2rem] px-[0.75rem] bg-primary-100 text-primary-600E rounded-full text-nowrap overflow-ellipsis"
              key={index}
            >
              {skill}
            </p>
          );
        })}
      </div>
    </Card>
  );
};

TeacherCard.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.string,
  description: PropTypes.string,
  skills: PropTypes.array,
  className: PropTypes.string,
};

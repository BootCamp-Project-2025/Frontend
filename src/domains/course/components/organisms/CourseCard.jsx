import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { NavLink } from "react-router-dom";

function CourseCard({
  courseId,
  courseName,
  courseImage,
  style = {},
  className = "",
}) {
  function deleteCourse() {
    console.log(`deleted course ${courseId}`);
  }
  return (
    <div
      style={style}
      className={`flex border-1 border-blue-500 rounded-md w-full ${className}`}
    >
      <img
        style={{ width: "10rem", height: "6rem" }}
        src={courseImage}
        alt="course image"
      />
      <div className="ml-2 flex gap-3 p-3 flex-col justify-evenly">
        <p className="text-blue-500 text-3xl">{courseName}</p>
        <div className="flex gap-6">
          <Button classname=" font-medium text-sm" styleType="callToAction">
            <NavLink to={`/course/${courseId}`} end>
              Edit Course
            </NavLink>
          </Button>
          <Button
            onClick={deleteCourse}
            classname="text-red-500 text-sm font-medium border-red-500 border-1"
            styleType="addBtn"
            color="light"
          >
            Delete Course
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;

CourseCard.propTypes = {
  courseName: PropTypes.string,
  courseId: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  courseImage: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

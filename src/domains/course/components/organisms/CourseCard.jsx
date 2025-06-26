import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Card } from "../../../../shared/components/atoms/Card";
import { NavLink } from "react-router-dom";

function CourseCard({ courseId, courseName, courseDescription, courseImage }) {
  function deleteCourse() {
    console.log(`deleted course ${courseId}`);
  }
  return (
    <Card className="flex flex-row space-x-4 gap-10" radius="none">
      <div className="flex flex-row">
        <img
          style={{ width: "12rem", height: "10rem" }}
          src={courseImage}
          alt="course image"
        />
        <div className="mx-auto">
          <Title color="secondary" className="px-2 py-1">
            {courseName}
          </Title>
          <p className="px-2 py-1">{courseDescription}</p>
        </div>
      </div>

      <div className="justify-center flex flex-col gap-3">
        <Button
          variant="bordered"
          className="w-20"
          contentClassName="justify-center"
        >
          <NavLink to={`/course/${courseId}`} end>
            Edit
          </NavLink>
        </Button>
        <Button onClick={deleteCourse} color="danger" variant="bordered">
          Delete
        </Button>
      </div>
    </Card>
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

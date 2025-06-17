import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Card } from "../../../../shared/components/atoms/Card";
import { NavLink } from "react-router-dom";

function CourseCard({ courseId, courseName, courseImage }) {
  function deleteCourse() {
    console.log(`deleted course ${courseId}`);
  }
  return (
    <Card className="flex-row">
      <img
        style={{ width: "10rem", height: "6rem" }}
        src={courseImage}
        alt="course image"
      />
      <div className="ml-2 flex gap-3 p-3 flex-col justify-evenly">
        <Title>{courseName}</Title>
        <div className="flex gap-6">
          <Button>
            <NavLink to={`/course/${courseId}`} end>
              Edit Course
            </NavLink>
          </Button>
          <Button onClick={deleteCourse} color="danger" variant="bordered">
            Delete Course
          </Button>
        </div>
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

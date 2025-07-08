import PropTypes from "prop-types";

export const CourseDetailsCreatedBy = ({ teacher = "teacherName" }) => {
  return (
    <div className="flex flex-row gap-1">
      <p>Created By </p>
      <a
        className="text-primary-600 border-b border-primary-600"
        href="#teacherSection"
      >
        {teacher}
      </a>
    </div>
  );
};

CourseDetailsCreatedBy.propTypes = {
  teacher: PropTypes.string,
  teacherId: PropTypes.string,
};

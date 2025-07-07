import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CourseBannerCreatedBy = ({
  teacher = "teacherName",
  teacherId,
}) => {
  return (
    <div className="flex flex-row gap-1">
      <p>Created By </p>
      <Link
        className="text-primary-600 border-b border-primary-600"
        to={teacherId ? `/teachers/${teacherId}` : "#"}
      >
        {teacher}
      </Link>
    </div>
  );
};

CourseBannerCreatedBy.propTypes = {
  teacher: PropTypes.string,
  teacherId: PropTypes.string,
};

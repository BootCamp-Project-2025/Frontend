import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useGetCourseList } from "../../customHooks/UseGetCourseList";

function CourseCardList({ style = {}, className = "" }) {
  const data = useGetCourseList();

  return (
    <div
      style={style}
      className={`m-auto w-2/3 flex flex-col gap-3 ${className}`}
    >
      {data.map((course, id) => (
        <CourseCard
          key={id}
          courseId={course.id}
          courseName={course.name}
          courseImage={course.imgSrc}
        />
      ))}
    </div>
  );
}

export default CourseCardList;

CourseCardList.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

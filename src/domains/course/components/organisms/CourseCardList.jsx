import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useGetCourseList } from "../../customHooks/UseGetCourseList";
import SearchAndCreateBar from "../molecules/SearchAndCreateBar";
import { useState } from "react";

function CourseCardList({ style = {}, className = "" }) {
  const data = useGetCourseList();
  const [courseFiltered, setCourseFiltered] = useState(data);

  return (
    <div
      style={style}
      className={`m-auto w-2/3 flex flex-col gap-3 ${className}`}
    >
      <SearchAndCreateBar
        courses={data}
        onFiltered={setCourseFiltered}
        onCreate={() => console.log("we will create")}
      />
      {data.map((course, id) => (
        <CourseCard
          key={id}
          courseId={course.id}
          courseName={course.name}
          courseDescription={course.description}
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

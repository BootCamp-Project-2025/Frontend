import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useGetCourseList } from "../../customHooks/UseGetCourseList";
import SearchAndCreateBar from "../molecules/SearchAndCreateBar";
import { useState, useEffect } from "react";

function CourseCardList({ style = {}, className = "" }) {
  const data = useGetCourseList();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setCourses(data);
    setFiltered(data);
  }, [data]);

  const handleDelete = (deletedId) => {
    const newList = courses.filter((c) => c.id !== deletedId);
    setCourses(newList);
    setFiltered((f) => f.filter((c) => c.id !== deletedId));
  };

  const handleEdit = (updatedCourse) => {
    const newList = courses.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setCourses(newList);
    // re-aplicar filtro si lo tienes
    setFiltered(newList);
  };

  return (
    <div
      style={style}
      className={`m-auto w-2/3 flex flex-col gap-3 ${className}`}
    >
      <SearchAndCreateBar courses={courses} onFiltered={setFiltered} />
      {filtered.map((course, id) => (
        <CourseCard
          key={id}
          courseId={course.id}
          courseName={course.name}
          courseDescription={course.description}
          courseImage={course.imgSrc}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
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

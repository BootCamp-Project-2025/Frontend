// CourseCardList.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";
import SearchAndCreateBar from "../molecules/SearchAndCreateBar";
import { useGetCourseList } from "../../customHooks/UseGetCourseList";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../../../teacher/components/atoms/PopupFormLayout";
import { useDeleteCourse } from "../../customHooks/UseDeleteCourse";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";
import CourseTypeSelection from "../../../teacher/components/molecules/CourseTypeSelection";
import { useNavigate } from "react-router-dom";

function CourseCardList({ style = {}, className = "" }) {
  const data = useGetCourseList();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { openPopup, closePopup } = usePopup();
  const { remove } = useDeleteCourse();
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(data);
    setFiltered(data);
  }, [data]);

  const addNewCourse = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
    setFiltered((prev) => [...prev, newCourse]);
  };

  const handleNewCourse = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "What type of course do you want to create?",
        children: <CourseTypeSelection addCourse={addNewCourse} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleEditClick = (course) => () => {
    navigate(`/dashboard/courses/${course.id}/homePage?name=${course.name}`);
  };

  const handleDeleteClick = (course) => () => {
    openPopup(
      DeleteCardPopup,
      {
        title: "Are you sure?",
        deleteAction: async (id) => {
          await remove(id);
          setCourses((prev) => prev.filter((c) => c.id !== id));
          setFiltered((prev) => prev.filter((c) => c.id !== id));
          closePopup();
        },
        id: course.id,
        closePopup,
      },
      true
    );
  };

  return (
    <div
      style={style}
      className={`mx-auto w-full max-w-3xl p-4 flex flex-col gap-6 ${className}`}
    >
      <SearchAndCreateBar
        courses={courses}
        onFiltered={setFiltered}
        onCreateCourse={handleNewCourse}
      />
      <div className="flex flex-col gap-4">
        {filtered.map((course) => (
          <CourseCard
            key={course.id}
            courseId={course.id}
            courseName={course.name}
            courseDescription={course.description}
            courseImage={course.imgSrc}
            onEditClick={handleEditClick(course)}
            onDeleteClick={handleDeleteClick(course)}
          />
        ))}
      </div>
    </div>
  );
}

CourseCardList.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default CourseCardList;

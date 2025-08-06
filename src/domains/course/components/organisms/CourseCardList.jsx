// CourseCardList.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";
import SearchAndCreateBar from "../molecules/SearchAndCreateBar";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../../../teacher/components/atoms/PopupFormLayout";
import { useDeleteCourse } from "../../customHooks/UseDeleteCourse";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";
import CourseTypeSelection from "../../../teacher/components/molecules/CourseTypeSelection";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useUserCourses } from "../../customHooks/useUserCourses";

function CourseCardList({ style = {}, className = "" }) {
  const { user } = useAuth();
  const { openPopup, closePopup } = usePopup();
  const { remove } = useDeleteCourse();
  const navigate = useNavigate();
  const { courses: data, loading, error } = useUserCourses(user?.id);
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!data) return;
    setCourses(data);
    setFiltered(data);
  }, [data]);

  const addNewCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
    setFiltered((prev) => [newCourse, ...prev]);
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
    navigate(`/teacher/courses/${course.id}/homePage?name=${course.name}`);
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
      className={`mx-auto wrapper p-4 flex flex-col gap-6 ${className}`}
    >
      <Title
        size="xxl"
        color="default"
        className="border-b-2 border-[var(--color-secondary-500)]"
      >
        Course Section
      </Title>

      {loading && <Loading text="Loading courses..." />}

      {!loading && error && (
        <Alert
          type="error"
          title="Failed to load courses"
          description="An unexpected error occurred while fetching your courses. Please try again later."
        />
      )}
      {!loading && !error && (
        <>
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
                published={course.published}
                courseImage={course.imgSrc}
                onEditClick={handleEditClick(course)}
                onDeleteClick={handleDeleteClick(course)}
                category={course.category}
                subCategory={course.subCategory}
                language={course.language}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

CourseCardList.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default CourseCardList;

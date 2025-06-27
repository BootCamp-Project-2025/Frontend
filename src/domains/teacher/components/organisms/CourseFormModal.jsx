import PropTypes from "prop-types";
import { useState } from "react";
import CourseForm from "../molecules/CourseForm";
import CourseTypeSelection from "../molecules/CourseTypeSelection";

CourseFormModal.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default function CourseFormModal({ closePopup }) {
  const [courseType, setCourseType] = useState(null);

  const onSubmit = (data) => {
    console.log({ ...data, courseType });
    //Implement post logic here
    closePopup();
  };

  return (
    <div className="lg:p-2 p-2 bg-white mx-auto lg:w-[50vw] w-[80vw]">
      {courseType ? (
        <CourseForm onSubmit={onSubmit} />
      ) : (
        <CourseTypeSelection setCourseType={setCourseType} />
      )}
    </div>
  );
}

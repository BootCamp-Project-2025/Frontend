import PropTypes from "prop-types";
import { useState } from "react";
import CourseForm from "../organisms/CourseForm";
import CourseTypeSelection from "../organisms/CourseTypeSelection";

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
    <div className=" lg:p-6 p-2 bg-white rounded-2xl mx-auto lg:w-[50vw] w-[80vw]">
      {courseType ? (
        <CourseForm onSubmit={onSubmit} />
      ) : (
        <CourseTypeSelection setCourseType={setCourseType} />
      )}
    </div>
  );
}

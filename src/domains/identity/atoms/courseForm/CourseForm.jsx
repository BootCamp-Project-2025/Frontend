import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CourseForm({ closePopup }) {
  const [courseType, setCourseType] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    closePopup();
  };

  const CourseSelection = () => (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-blue-500 text-xl md:text-2xl font-medium text-center">
        First of all, what type of course do you want to create?
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 min-h-[200px] border border-gray-300 rounded-xl flex items-center justify-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <button
            type="button"
            className="flex flex-col items-center justify-center space-y-2 w-full h-full focus:outline-none"
            onClick={() => setCourseType("static")}
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📘</span>
            </div>
            <span className="text-blue-500 text-lg md:text-xl font-semibold">
              Static Course
            </span>
          </button>
        </div>

        <div className="w-full md:w-1/2 min-h-[200px] border border-gray-300 rounded-xl flex items-center justify-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <button
            type="button"
            className="flex flex-col items-center justify-center space-y-2 w-full h-full focus:outline-none"
            onClick={() => setCourseType("p2p")}
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">🎓</span>
            </div>
            <span className="text-blue-500 text-lg md:text-xl font-semibold">
              P2P Course
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const CourseFormFields = () => (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-gray-700 text-2xl font-medium text-center">
        Create Your Course
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-gray-600 font-medium">
            Course Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register("name", { required: true })}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition outline-0"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="description" className="text-gray-600 font-medium">
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            {...register("description", { required: true })}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition outline-0"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="self-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Create course
        </button>
      </form>
    </div>
  );

  return (
    <div className=" lg:p-6 p-2 bg-white rounded-2xl mx-auto lg:w-[50vw] w-[80vw]">
      {courseType ? <CourseFormFields /> : <CourseSelection />}
    </div>
  );
}

CourseForm.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default function CourseForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
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
            className={`border  ${errors.name ? "border-red-500" : " border-gray-300 focus:border-blue-400"} rounded-lg px-3 py-2 w-full  transition outline-0`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">This field is required</span>
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
            className={`border  ${errors.description ? "border-red-500" : " border-gray-300 focus:border-blue-400"} rounded-lg px-3 py-2 w-full  transition outline-0`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <Button
          styleType="addBtn"
          type="submit"
          classname="text-white self-center"
        >
          Create course
        </Button>
      </form>
    </div>
  );
}

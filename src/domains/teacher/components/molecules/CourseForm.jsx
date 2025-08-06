import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { useCreateCourse } from "../../../course/customHooks/UseCreateCourse";

export default function CourseForm({
  closePopup,
  type = "static",
  defaultValues = {},
  onSubmit: externalSubmit,
  addCourse,
}) {
  const { create, isCreating, error: submitError } = useCreateCourse();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues.name || "",
      description: defaultValues.description || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (externalSubmit) {
        await externalSubmit(data);
      } else if (type === "static") {
        const created = await create({ ...data, imgSrc: "/new-course.png" });
        addCourse(created);
      }
      closePopup();
    } catch {
      console.log(errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <label htmlFor="name" className="w-32 font-medium text-gray-700">
            Course Name:
          </label>
          <input
            id="name"
            {...register("name", { required: "Course name is required" })}
            className={`flex-1 border rounded-lg px-3 py-2 transition outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={100}
          />
        </div>
        {errors.name && (
          <span className="ml-32 text-red-500 text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-4">
          <label
            htmlFor="description"
            className="w-32 font-medium text-gray-700 pt-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description", {
              required: "Description is required",
              validate: (value) =>
                value.split("\n").length <= 3 ||
                "Description must be 3 lines or less",
            })}
            className={`flex-1 border rounded-lg px-3 py-2 transition outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={2000}
          />
        </div>
        {errors.description && (
          <span className="ml-32 text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {submitError && (
        <p className="text-red-500 text-sm">
          {submitError.response.data.message || "Failed to save course."}
        </p>
      )}

      <div className="flex justify-center gap-3 mt-4">
        <Button
          variant="bordered"
          color="default"
          onClick={closePopup}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating} className="px-4 py-2">
          {isCreating ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}

CourseForm.propTypes = {
  closePopup: PropTypes.func.isRequired,
  type: PropTypes.string,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  addCourse: PropTypes.func,
};

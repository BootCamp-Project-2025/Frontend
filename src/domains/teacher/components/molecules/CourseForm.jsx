import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { useCreateCourse } from "../../../course/customHooks/UseCreateCourse";

export default function CourseForm({
  closePopup,
  type = "static",
  defaultValues = {},
  onSubmit: externalSubmit,
}) {
  const { create, isCreating, error } = useCreateCourse();
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
        const newCourse = await create({
          ...data,
          imgSrc: "/new-course.png",
        });
        console.log("Created:", newCourse);
      }
    } catch (err) {
      alert("Failed to create course");
    }

    closePopup();
  };

  return (
    <div className="flex flex-col gap-5 w-96">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-row gap-2 w-full">
          <label htmlFor="name" className="text-gray-600 font-medium w-auto">
            Name of the course:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register("name", { required: true })}
            className={`border  ${errors.name ? "border-red-500" : " border-gray-300 focus:border-blue-400"} rounded-lg px-2 py-1 w-full transition outline-0`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-row gap-2 w-full justify-between">
          <label
            htmlFor="description"
            className="text-gray-600 font-medium w-auto"
          >
            Add a description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            {...register("description", { required: true })}
            className={`border  ${errors.description ? "border-red-500" : " border-gray-300 focus:border-blue-400"} rounded-lg px-2 py-1 max-w-96 transition outline-0`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="justify-center flex flex-row gap-3">
          <Button
            variant="bordered"
            color="default"
            className={"w-24"}
            contentClassName="justify-center"
            onClick={closePopup}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-24"
            contentClassName="justify-center"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
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
};

import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import DropdownSection from "../../../course/components/organisms/DropdownSection";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert } from "../../../../shared/components/molecules/Alert";

export default function RequestForm({
  closePopup,
  saveRequest,
  initialValues,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      estimation: initialValues?.estimation || 1,
    },
  });

  const [courseInfo, setCourseInfo] = useState({
    category: "",
    subCategory: "",
    language: "",
  });
  const [customError, setCustomError] = useState("");

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const missingFields = [];

        if (!courseInfo.language) missingFields.push("Language");
        if (!courseInfo.category) missingFields.push("Category");
        if (!courseInfo.subCategory) missingFields.push("Subcategory");

        if (missingFields.length > 0) {
          const formattedFields = missingFields.join(", ");
          setCustomError(`Please select: ${formattedFields}.`);
          return;
        }

        setCustomError("");

        const response = await saveRequest({ ...data, ...courseInfo });
        if (response.success) {
          closePopup();
        }
      })}
      className="flex sm:w-3xl flex-col gap-8 py-6 px-10"
    >
      <Title className="self-center" color="secondary">
        {initialValues ? "Edit your request" : "Create your request"}
      </Title>
      <TextInput
        id="title"
        register={register("title", {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "The title must be at least 10 characters",
          },
        })}
        errorMessage={errors?.title?.message}
        label="Request title:"
        placeholder="Enter a title"
      />
      <TextAreaInput
        id="description"
        register={register("description", {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "The description must be at least 10 characters",
          },
        })}
        errorMessage={errors?.description?.message}
        rows={5}
        label="Description:"
        placeholder="Enter a description"
      />
      <div>
        <p className="mb-3 text-gray-600 font-semibold text-lg">
          Basic information:
        </p>
        {customError && (
          <div className="my-2.5">
            <Alert type="error" title={customError} />
          </div>
        )}
        <DropdownSection course={courseInfo} setCourse={setCourseInfo} />
      </div>
      <div className="flex justify-center gap-6">
        <Button color="secondary" onClick={closePopup} variant="bordered">
          Cancel
        </Button>
        <Button type="submit">
          {initialValues ? "Update request" : "Publish your request"}
        </Button>
      </div>
    </form>
  );
}

RequestForm.propTypes = {
  closePopup: PropTypes.func,
  saveRequest: PropTypes.func,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    estimation: PropTypes.number,
    id: PropTypes.string,
  }),
};

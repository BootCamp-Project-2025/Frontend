import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import DropdownSection from "../../../course/components/organisms/DropdownSection";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";

export default function RequestForm({ closePopup }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const courseInfo = { category: "", subCategory: "", language: "" };
  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("asd");
      })}
      className="flex sm:w-3xl overflow-clip flex-col gap-8 py-6 px-10"
    >
      <Title className="self-center" color="secondary">
        Create your request
      </Title>
      <TextInput
        id={"name"}
        register={register("name", {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "The name must be at least 10 characters",
          },
        })}
        errorMessage={errors?.name?.message}
        label="Request name:"
      />

      <TextAreaInput
        id={"description"}
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
      />
      <div>
        <p className="mb-3 text-gray-600  font-semibold text-lg">
          Basic information:
        </p>
        <DropdownSection course={courseInfo} />
      </div>
      <div className="flex justify-center gap-6">
        <Button color="secondary" onClick={closePopup} variant="bordered">
          Cancel
        </Button>
        <Button type="submit">Publish your request</Button>
      </div>
    </form>
  );
}

RequestForm.propTypes = {
  closePopup: PropTypes.func,
};

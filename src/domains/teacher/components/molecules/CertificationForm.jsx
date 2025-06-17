import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { NumberInput } from "../../../../shared/components/molecules/NumberInput";

export default function CertificationForm({
  closePopup,
  certification,
  onSubmit,
  onDelete,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitCertificationForm = (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.error("onAddCertification function is not provided");
    }
    closePopup();
  };

  return (
    <form
      className="p-3 gap-3 flex flex-col"
      onSubmit={handleSubmit(onSubmitCertificationForm)}
    >
      <input defaultValue={certification?.id} hidden {...register("id")} />

      <TextInput
        id={"name"}
        maxLength={50}
        label={"Certification Name"}
        placeholder={"Certification name"}
        errorMessage={errors.name ? errors.name.message : ""}
        register={
          ("name",
          {
            required: "Certification name is required",
            minLength: {
              value: 2,
              message: "Minimum length is 2 characters",
            },
            maxLength: {
              value: 100,
              message: "Maximum length is 100 characters",
            },
          })
        }
      ></TextInput>
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <TextInput
          id="institution"
          label="Institution"
          placeholder="Institution"
          errorMessage={errors.institution?.message}
          maxLength={50}
          register={register("institution", {
            required: "Institution is required",
            minLength: {
              value: 2,
              message: "Minimum length is 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Maximum length is 50 characters",
            },
          })}
        />
        <NumberInput
          id="year"
          name="year"
          type="number"
          label="Year"
          errorMessage={errors.year ? errors.year.message : ""}
          register={register("year", {
            required: "Year is required",
            min: { value: 1900, message: "Year must be after 1900" },
            max: {
              value: new Date().getFullYear(),
              message: `Year cannot be in the future`,
            },
          })}
        />
      </div>
      <div className="flex justify-around gap-3 w-full mt-4">
        {onDelete && certification ? (
          <Button
            styleType="callToAction"
            color="danger"
            variant="bordered"
            onClick={() => onDelete(certification.id)}
          >
            Delete
          </Button>
        ) : null}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

CertificationForm.propTypes = {
  closePopup: PropTypes.func.isRequired,
  certification: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

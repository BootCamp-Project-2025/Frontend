import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import Input from "../atoms/Input";

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
    <>
      <div className="relative w-full flex justify-center items-center">
        <h3 className="font-bold text-blue-500 text-xl">Certification Form</h3>
        <button
          aria-label="Close form"
          className="w-9 h-9 rounded-full bg-gray-300 absolute right-0 flex justify-center items-center hover:bg-gray-400 transition-colors duration-200"
          onClick={closePopup}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <form
        className="w-[80vw]  lg:w-[30vw] p-3 gap-3 flex flex-col"
        onSubmit={handleSubmit(onSubmitCertificationForm)}
      >
        <input defaultValue={certification?.id} hidden {...register("id")} />
        <Input
          id="name"
          name="name"
          type="text"
          label="Certification Name"
          error={errors.name ? errors.name.message : ""}
          defaultValue={certification?.name || ""}
          {...register("name", {
            required: "Certification name is required",
            minLength: {
              value: 2,
              message: "Minimum length is 2 characters",
            },
            maxLength: {
              value: 100,
              message: "Maximum length is 100 characters",
            },
          })}
        />
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <Input
            id="institution"
            name="institution"
            type="text"
            label="Institution"
            error={errors.institution ? errors.institution.message : ""}
            defaultValue={certification?.institution || ""}
            {...register("institution", {
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
          <Input
            id="year"
            name="year"
            type="number"
            label="Year"
            error={errors.year ? errors.year.message : ""}
            defaultValue={certification?.year || ""}
            {...register("year", {
              required: "Year is required",
              min: { value: 1900, message: "Year must be after 1900" },
              max: {
                value: new Date().getFullYear(),
                message: `Year cannot be in the future`,
              },
            })}
          />
        </div>
        <div className="flex justify-around gap-3 w-full">
          {onDelete && certification ? (
            <Button
              styleType="callToAction"
              type="button"
              color="pink"
              onClick={() => onDelete(certification.id)}
            >
              Delete
            </Button>
          ) : null}
          <Button styleType="callToAction" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

CertificationForm.propTypes = {
  closePopup: PropTypes.func.isRequired,
  certification: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

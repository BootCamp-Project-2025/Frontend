import { useForm } from "react-hook-form";
import { TextInput } from "../molecules/TextInput";
import { MonthInput } from "../molecules/MothInput";
import { TextAreaInput } from "../molecules/TextAreaInput";
import PropTypes from "prop-types";

export const ExperienceSectionForm = ({
  jobPosition = "",
  employer = "",
  country = "",
  description = "",
  startDate = "",
  endDate = "",
  addExperienceCard = () => {},
  closeExperienceForm = () => {},
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      jobPosition,
      employer,
      country,
      description,
      startDate,
      endDate,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addExperienceCard({ ...data, id: crypto.randomUUID() });
        closeExperienceForm();
      })}
      className="flex flex-col gap-2 items-start"
    >
      <h1 className="text-center w-full text-2xl font-semibold text-gray-700">
        Experience Form
      </h1>
      <TextInput
        register={register("jobPosition", {
          required: "This filed is required",
          minLength: { value: 1, message: "At least 1 letter" },
          maxLength: { value: 50, message: "Maximum 50 letters" },
        })}
        maxLength={50}
        label={"Position"}
        placeholder={"Job position"}
        errorMessage={errors?.jobPosition?.message}
      ></TextInput>

      <div className="flex flex-row w-full sm:gap-5 sm:flex-nowrap flex-wrap gap-2 ">
        <TextInput
          register={register("employer", {
            required: "This filed is required",
            minLength: { value: 1, message: "At least 1 letter" },
            maxLength: { value: 30, message: "Maximum 30 letters" },
          })}
          label={"Employer"}
          placeholder={"Employer name"}
          errorMessage={errors?.employer?.message}
        ></TextInput>

        <TextInput
          register={register("country", {
            required: "This filed is required",
            minLength: { value: 1, message: "At least 1 letter" },
            maxLength: { value: 30, message: "Maximum 30 letters" },
          })}
          label={"Country"}
          placeholder={"Country"}
          errorMessage={errors?.country?.message}
        ></TextInput>
      </div>
      <div className="flex flex-row w-full sm:gap-5  sm:flex-nowrap flex-wrap gap-2">
        <MonthInput
          label="Start Date"
          register={register("startDate", {
            required: "This field is required",
            validate: (value) => {
              let endDate = watch("endDate");
              if (endDate && value > endDate) {
                return "Start Date cannot be after End Date";
              }
              return true;
            },
          })}
          errorMessage={errors?.startDate?.message}
        ></MonthInput>

        <MonthInput
          label="End Date"
          register={register("endDate", {
            required: "This field is requried",
          })}
          errorMessage={errors?.endDate?.message}
        ></MonthInput>
      </div>
      <TextAreaInput
        label="Description"
        register={register("description", {
          required: "This field is required",
          minLength: { value: 50, message: "At least 50 characters" },
          maxLength: { value: 500, message: "Maximum 500 characters allowed" },
        })}
        maxLength={500}
        errorMessage={errors?.description?.message}
        rows={5}
      ></TextAreaInput>

      <div className="flex flex-row justify-end w-full mt-2">
        <button
          type="submit"
          className="px-7 py-1.5 bg-[#3B82F6] rounded-full cursor-pointer  text-white"
        >
          Completed
        </button>
      </div>
    </form>
  );
};

ExperienceSectionForm.propTypes = {
  jobPosition: PropTypes.string,
  employer: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  addExperienceCard: PropTypes.func,
  closeExperienceForm: PropTypes.func,
};

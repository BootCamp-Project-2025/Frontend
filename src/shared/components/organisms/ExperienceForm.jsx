import { useForm } from "react-hook-form";
import { TextInput } from "../molecules/TextInput";
import { MonthInput } from "../molecules/MothInput";
import { TextAreaInput } from "../molecules/TextAreaInput";
import PropTypes from "prop-types";

export const ExperienceForm = ({
  id = "",
  jobPosition = "",
  employer = "",
  country = "",
  description = "",
  startDate = "",
  endDate = "",
  addExperienceCard = () => {},
  closeExperienceForm = () => {},
  updateExperienceCard = () => {},
  removeExperience = () => {},
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
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
        console.log(data);
        if (id != "") {
          updateExperienceCard({ ...data, id });
        } else {
          addExperienceCard({ ...data, id: crypto.randomUUID() });
          closeExperienceForm();
        }
      })}
      className="flex flex-col gap-2 items-start"
    >
      <h1 className="text-center w-full text-2xl font-semibold text-blue-500">
        Experience Form
      </h1>
      <TextInput
        register={register("jobPosition", {
          required: "This filed is required",
          minLength: { value: 3, message: "At least 3 letter" },
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
            minLength: { value: 3, message: "At least 3 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Employer"}
          placeholder={"Employer name"}
          errorMessage={errors?.employer?.message}
        ></TextInput>

        <TextInput
          register={register("country", {
            required: "This filed is required",
            minLength: { value: 3, message: "At least 3 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
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

      <div className="flex flex-row justify-end w-full mt-2 gap-2">
        {id != "" && (
          <button
            type="button"
            className="px-7 py-1.5 bg-pink-500 rounded-full cursor-pointer  text-white"
            onClick={() => {
              removeExperience(id);
              closeExperienceForm();
            }}
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="px-7 py-1.5 bg-[#3B82F6] rounded-full cursor-pointer  text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

ExperienceForm.propTypes = {
  id: PropTypes.string,
  jobPosition: PropTypes.string,
  employer: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  addExperienceCard: PropTypes.func,
  closeExperienceForm: PropTypes.func,
  updateExperienceCard: PropTypes.func,
  removeExperience: PropTypes.func,
};

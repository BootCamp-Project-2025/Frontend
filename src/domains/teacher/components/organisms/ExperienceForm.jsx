import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { MonthInput } from "../../../../shared/components/molecules/MonthInput";
import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../../../shared/components/atoms/Button";

export const ExperienceForm = ({
  id = "",
  jobPosition = "",
  employer = "",
  country = "",
  description = "",
  startDate = "",
  endDate = "",
  addCard = () => {},
  closeForm = () => {},
  updateCard = () => {},
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
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

  const saveNewRecordDB = async (data) => {
    // create logic to save new record at database
    // db should give as a record's id
    // create logic to manage errors
    let newId = uuidv4();
    addCard({ ...data, id: newId });
    closeForm();
  };

  const updateRecordDB = async (data) => {
    // create logic to updata record at database
    // create logic to manage errors
    updateCard(data);
  };

  const getMaxMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const maxMonth = useMemo(() => getMaxMonth(), []);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (id != "") {
          await updateRecordDB({ ...data, id });
        } else {
          await saveNewRecordDB(data);
        }
      })}
      className="flex flex-col gap-2 items-start"
    >
      <TextInput
        register={register("jobPosition", {
          required: "This field is required",
          minLength: { value: 3, message: "At least 3 letter" },
          maxLength: { value: 50, message: "Maximum 50 letters" },
        })}
        maxLength={50}
        label={"Position"}
        placeholder={"Job position"}
        errorMessage={errors?.jobPosition?.message}
        id={"jobPosition"}
      ></TextInput>

      <div className="flex flex-row w-full sm:gap-5 sm:flex-nowrap flex-wrap gap-2 ">
        <TextInput
          register={register("employer", {
            required: "This field is required",
            minLength: { value: 3, message: "At least 3 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Employer"}
          placeholder={"Employer name"}
          errorMessage={errors?.employer?.message}
          id={"employer"}
        ></TextInput>

        <TextInput
          register={register("country", {
            required: "This field is required",
            minLength: { value: 3, message: "At least 3 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Country"}
          placeholder={"Country"}
          errorMessage={errors?.country?.message}
          id={"country"}
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
          max={maxMonth}
          errorMessage={errors?.startDate?.message}
          id={"startDate"}
        ></MonthInput>

        <MonthInput
          label="End Date"
          register={register("endDate", {
            required: "This field is required",
          })}
          max={maxMonth}
          errorMessage={errors?.endDate?.message}
          id={"endDate"}
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
        id={"description"}
        rows={5}
      ></TextAreaInput>

      <div className="flex flex-row justify-center w-full mt-4 gap-4">
        <Button color="default" variant="bordered" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} isSpinning={isSubmitting}>
          Save
        </Button>
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
  addCard: PropTypes.func,
  closeForm: PropTypes.func,
  updateCard: PropTypes.func,
};

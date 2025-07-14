import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { MonthInput } from "../../../../shared/components/molecules/MonthInput";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../../../shared/components/atoms/Button";

export const EducationForm = ({
  id = "",
  university = "",
  career = "",
  startDate = "",
  finishDate = "",
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
      university,
      career,
      startDate,
      finishDate,
    },
  });

  const saveNewRecordDB = async (data) => {
    let newId = uuidv4();
    addCard({ ...data, id: newId });
    closeForm();
  };

  const updateRecordDB = async (data) => {
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
        register={register("university", {
          required: "This field is required",
          minLength: { value: 3, message: "At least 3 letter" },
          maxLength: { value: 50, message: "Maximum 50 letters" },
        })}
        maxLength={50}
        label={"University"}
        placeholder={"University name"}
        errorMessage={errors?.university?.message}
        id={"university"}
      ></TextInput>

      <div className="flex flex-row w-full sm:gap-5 sm:flex-nowrap flex-wrap gap-2 ">
        <TextInput
          register={register("career", {
            required: "This field is required",
            minLength: { value: 3, message: "At least 3 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Career"}
          placeholder={"career name"}
          errorMessage={errors?.career?.message}
          id={"career"}
        ></TextInput>
      </div>
      <div className="flex flex-row w-full sm:gap-5  sm:flex-nowrap flex-wrap gap-2">
        <MonthInput
          label="Start Date"
          register={register("startDate", {
            required: "This field is required",
            validate: (value) => {
              let endDate = watch("finishDate");
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
          register={register("finishDate", {
            required: "This field is required",
          })}
          max={maxMonth}
          errorMessage={errors?.finishDate?.message}
          id={"finishDate"}
        ></MonthInput>
      </div>

      <div className="flex flex-row justify-center w-full mt-2 gap-4">
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

EducationForm.propTypes = {
  id: PropTypes.string,
  university: PropTypes.string,
  career: PropTypes.string,
  startDate: PropTypes.string,
  finishDate: PropTypes.string,
  addCard: PropTypes.func,
  closeForm: PropTypes.func,
  updateCard: PropTypes.func,
};

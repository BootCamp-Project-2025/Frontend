import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { MonthInput } from "../../../../shared/components/molecules/MonthInput";
import { Button } from "../../../../shared/components/atoms/Button";

export const EducationForm = ({
  id = "",
  university = "",
  career = "",
  startDate = "",
  endDate = "",
  addCard = () => {},
  closeForm = () => {},
  updateCard = () => {},
  removeCard = () => {},
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
      endDate,
    },
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const saveNewRecordDB = async (data) => {
    await delay(1000);
    // create logic to save new record at database
    // db should give as a record's id
    // create logic to manage errors
    let newId = crypto.randomUUID();
    addCard({ ...data, id: newId });
    closeForm();
  };

  const updateRecordDB = async (data) => {
    await delay(1000);
    // create logic to updata record at database
    // create logic to manage errors
    updateCard(data);
  };

  const deleteRecordDB = async (id) => {
    setIsDeleting(true);
    await delay(1000);
    // create logic to delete record at database
    // create logic to manage errors
    removeCard(id);
    setIsDeleting(false);
    closeForm();
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

      <div className="flex flex-row justify-center w-full mt-2 gap-4">
        {id != "" && (
          <Button
            disabled={isSubmitting || isDeleting}
            color="danger"
            variant="bordered"
            onClick={() => {
              deleteRecordDB(id);
            }}
            isSpinning={isDeleting}
          >
            Delete
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || isDeleting}
          isSpinning={isSubmitting}
        >
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
  endDate: PropTypes.string,
  addCard: PropTypes.func,
  closeForm: PropTypes.func,
  updateCard: PropTypes.func,
  removeCard: PropTypes.func,
};

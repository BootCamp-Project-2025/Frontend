import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useState } from "react";
import SelectSkillLabeled from "../molecules/SelectSkillLabeled";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export const SkillForm = ({
  id = "",
  skill = { name: "", level: "beginner" },
  updateCard = () => {},
  addCard = () => {},
  closePopup = () => {},
}) => {
  const { name, level } = skill;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name,
      level,
    },
  });

  const [newLevel, setLevel] = useState(level);

  const changeLevel = (value) => {
    setLevel(value);
  };

  const saveNewRecordDB = async (data) => {
    console.log(newLevel);
    let newId = uuidv4();
    const payload = {
      ...data,
      level: newLevel.label?.toLowerCase() ?? newLevel.label.toLowerCase(),
      id: newId,
    };
    addCard(payload);
    closePopup();
  };

  const updateRecordDB = async (data) => {
    const payload = {
      ...data,
      level: newLevel.label?.toLowerCase() ?? newLevel.label.toLowerCase(),
      id,
    };
    updateCard(payload);
    closePopup();
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (id != "") {
          await updateRecordDB(data);
        } else {
          await saveNewRecordDB(data);
        }
      })}
      className="flex flex-col gap-2 items-center"
    >
      <div className="flex flex-col gap-7 w-full">
        <TextInput
          register={register("name", {
            required: "This field is required",
            minLength: { value: 1, message: "At least 1 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Skill"}
          placeholder={"Skill name"}
          errorMessage={errors?.name?.message}
          id={"name"}
        />

        <SelectSkillLabeled value={newLevel} onChange={changeLevel} />
      </div>

      <div className="flex flex-row justify-center w-full mt-2 gap-4">
        <Button color="default" variant="bordered" onClick={closePopup}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting} isSpinning={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

SkillForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skill: PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.string,
  }),
  updateCard: PropTypes.func,
  closePopup: PropTypes.func,
  addCard: PropTypes.func,
};

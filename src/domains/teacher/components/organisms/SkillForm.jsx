import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useState } from "react";
import SelectSkillLabeled from "../molecules/SelectSkillLabeled";
import PropTypes from "prop-types";

export const SkillForm = ({
  id = "",
  skillObject = { skill: "", level: "Beginner" },
  updateCard = () => {},
  addCard = () => {},
  closePopup = () => {},
}) => {
  const { skill, level } = skillObject;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      skill,
    },
  });

  const [newLevel, setLevel] = useState(level);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const saveSkill = async (data) => {
    await delay(1000);
    const payload = { skill: data.skill, level: newLevel };

    if (id === "") {
      addCard({ ...payload, id: crypto.randomUUID() });
    } else {
      updateCard({ ...payload, id });
    }

    closePopup();
  };

  const changeLevel = (value) => {
    setLevel(value);
  };

  return (
    <form
      onSubmit={handleSubmit(saveSkill)}
      className="flex flex-col gap-2 items-center"
    >
      <div className="flex flex-row gap-7">
        <TextInput
          register={register("skill", {
            required: "This field is required",
            minLength: { value: 1, message: "At least 1 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"Skill"}
          placeholder={"Skill name"}
          errorMessage={errors?.skill?.message}
          id={"skill"}
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
  skillObject: PropTypes.shape({
    skill: PropTypes.string,
    level: PropTypes.string,
  }),
  updateCard: PropTypes.func,
  closePopup: PropTypes.func,
  addCard: PropTypes.func,
};

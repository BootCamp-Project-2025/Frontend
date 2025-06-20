import propTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useRef, useState } from "react";
import SelectSkillLabeled from "../molecules/SelectSkillLabeled";
import PropTypes from "prop-types";

function TeacherSkillPopup({
  closePopup,
  addSkill,
  skillObject = { skill: "", level: "Beginner" },
  id,
}) {
  const { skill, level } = skillObject;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      skill,
    },
  });

  const [newLevel, setLevel] = useState(level);
  const newSkillRef = useRef(skill === "");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function deleteSkill() {
    await delay(1000);
    // Placeholder for delete functionality with API
    if (newSkillRef.current) {
      closePopup();
      return;
    }
    console.log("Delete skill functionality not implemented yet.");
    closePopup();
  }

  const changeLevel = (e) => {
    setLevel(e.target.value);
  };

  async function saveSkill(skill) {
    const data = { skill: skill.skill, level: newLevel };
    console.log(data);
    await delay(1000);
    addSkill(data);
    if (newSkillRef.current) {
      addSkill(data, true);
    } else {
      addSkill(data, false, id);
    }
    closePopup();
  }
  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={handleSubmit(async (skill) => {
        saveSkill(skill);
      })}
    >
      <div className="flex flex-row gap-7">
        <TextInput
          register={register("skill", {
            required: "This field is required",
            minLength: { value: 1, message: "At least 1 letter" },
            maxLength: { value: 50, message: "Maximum 50 letters" },
          })}
          maxLength={50}
          label={"skill"}
          placeholder={"skill name"}
          errorMessage={errors?.skill?.message}
          id={"skill"}
        />
        <SelectSkillLabeled onChange={changeLevel} value={newLevel} />
      </div>
      <div className="flex flex-row justify-center w-full mt-2 gap-4">
        {!newSkillRef.current && (
          <Button
            disabled={isSubmitting}
            color="danger"
            variant="bordered"
            onClick={() => {
              deleteSkill();
            }}
          >
            Delete
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} isSpinning={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default TeacherSkillPopup;

TeacherSkillPopup.propTypes = {
  id: PropTypes.number.isRequired,
  closePopup: propTypes.func.isRequired,
  addSkill: propTypes.func.isRequired,
  skillObject: propTypes.object.isRequired,
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { v4 as uuidv4 } from "uuid";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import Label from "../atoms/Label";

export const LanguageForm = ({
  id = "",
  name = "",
  level = "",
  addCard = () => {},
  updateCard = () => {},
  closeForm = () => {},
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues: { name, level } });

  const [newLevel, setLevel] = useState(level !== "" ? level : "basic");
  const changeLevel = (e) => {
    setLevel(e.value);
  };

  const languageLevel = [
    { value: "basic", label: "Basic" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "native", label: "Native" },
  ];

  const onSave = async (data) => {
    if (id) {
      updateCard({ ...data, level: newLevel, id });
    } else {
      let newId = uuidv4();
      addCard({ ...data, level: newLevel, id: newId });
    }
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <TextInput
        id="name"
        label="Language"
        placeholder="e.g. Spanish"
        register={register("name", { required: "Required" })}
        errorMessage={errors.name?.message}
        maxLength={50}
      />

      <Label>Level</Label>
      <Dropdown
        label={newLevel}
        variant="bordered"
        radius="small"
        options={languageLevel}
        onSelect={changeLevel}
        color="secondary"
      ></Dropdown>

      <div className="flex justify-center gap-3 mt-4">
        <Button
          color="default"
          variant="bordered"
          onClick={closeForm}
          disabled={isSubmitting}
        >
          Close
        </Button>
        <Button type="submit" isSpinning={isSubmitting} disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

LanguageForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.string,
  addCard: PropTypes.func,
  updateCard: PropTypes.func,
  closeForm: PropTypes.func,
};

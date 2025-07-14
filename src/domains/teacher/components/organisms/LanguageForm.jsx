import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { v4 as uuidv4 } from "uuid";

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

  const [newLevel, setLevel] = useState(level);
  const changeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onSave = async (data) => {
    if (id) {
      updateCard({ ...data, id });
    } else {
      let newId = uuidv4();
      addCard({ ...data, id: newId });
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

      <SelectInput
        id="level"
        label="Level"
        value={newLevel}
        onChange={changeLevel}
        register={register("level", { required: "Required" })}
        options={[
          { value: "basic", label: "Basic" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
          { value: "native", label: "Native" },
        ]}
        errorMessage={errors.level?.message}
      />

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

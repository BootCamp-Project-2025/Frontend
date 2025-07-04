import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { Button } from "../../../../shared/components/atoms/Button";

export const LanguageForm = ({
  id = "",
  name = "",
  proficiency = "",
  addLanguage = () => {},
  updateLanguage = () => {},
  closeForm = () => {},
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues: { name, proficiency } });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [newLevel, setLevel] = useState(proficiency);
  const changeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onSave = async (data) => {
    await delay(500);
    if (id) {
      updateLanguage({ ...data, id });
    } else {
      addLanguage({ ...data, id: crypto.randomUUID() });
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
        id="proficiency"
        label="Proficiency"
        value={newLevel}
        onChange={changeLevel}
        register={register("proficiency", { required: "Required" })}
        options={[
          { value: "Basic", label: "Basic" },
          { value: "Conversational", label: "Conversational" },
          { value: "Fluent", label: "Fluent" },
          { value: "Native", label: "Native" },
        ]}
        errorMessage={errors.proficiency?.message}
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
  proficiency: PropTypes.string,
  addLanguage: PropTypes.func,
  updateLanguage: PropTypes.func,
  closeForm: PropTypes.func,
};

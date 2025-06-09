import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { TextInput } from "../atoms/TextInput";
import { SelectInput } from "../atoms/SelectInput";
import { useState } from "react";

export function LanguageForm({
  id = "",
  name = "",
  proficiency = "",
  addLanguage,
  updateLanguage,
  removeLanguage,
  closeForm,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name, proficiency },
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const onSave = async (data) => {
    if (id) {
      await updateLanguage({ ...data, id });
    } else {
      let newId = crypto.randomUUID();
      await addLanguage({ ...data, id: newId });
    }
    closeForm();
  };

  const onDelete = async () => {
    setIsDeleting(true);
    await removeLanguage(id);
    setIsDeleting(false);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-blue-600 text-center">
        {id ? "Edit Language" : "Add Language"}
      </h2>

      <TextInput
        register={register("name", { required: "Required", minLength: 2 })}
        label="Language"
        placeholder="e.g. Spanish"
        errorMessage={errors.name?.message}
      />

      <SelectInput
        register={register("proficiency", { required: "Required" })}
        label="Proficiency"
        options={[
          { value: "Basic", label: "Basic" },
          { value: "Conversational", label: "Conversational" },
          { value: "Fluent", label: "Fluent" },
          { value: "Native", label: "Native" },
        ]}
        errorMessage={errors.proficiency?.message}
      />

      <div className="flex justify-end gap-3 mt-4">
        {id && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting || isSubmitting}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || isDeleting}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

LanguageForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  proficiency: PropTypes.string,
  addLanguage: PropTypes.func.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  removeLanguage: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

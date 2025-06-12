import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import { SelectInput } from "../../../../shared/components/atoms/SelectInput";
import { TextInput } from "../../../../shared/components/molecules/TextInput";

export const LanguageForm = ({
  id = "",
  name = "",
  proficiency = "",
  addLanguage = () => {},
  updateLanguage = () => {},
  removeLanguage = () => {},
  closeForm = () => {},
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: { name, proficiency },
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const onSave = async (data) => {
    if (id) {
      await delay(500);
      updateLanguage({ ...data, id });
    } else {
      await delay(500);
      addLanguage({ ...data, id: crypto.randomUUID() });
    }
    closeForm();
  };

  const onDelete = async () => {
    setIsDeleting(true);
    await delay(500);
    removeLanguage(id);
    setIsDeleting(false);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-blue-500 text-center">
        {id ? "Edit Language" : "Add Language"}
      </h2>

      <TextInput
        id="name"
        label="Language"
        placeholder="e.g. Spanish"
        register={register("name", { required: "Required" })}
        errorMessage={errors.name?.message}
      />

      <div className="flex flex-col w-full">
        <label className="font-medium">Proficiency</label>
        <SelectInput
          id="proficiency"
          register={register("proficiency", { required: "Required" })}
          label={"Language"}
          options={[
            { value: "basic", label: "Basic" },
            { value: "conversational", label: "Conversational" },
            { value: "fluent", label: "Fluent" },
            { value: "native", label: "Native" },
          ]}
          errorMessage={errors.proficiency?.message}
        />
      </div>

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
};

LanguageForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  proficiency: PropTypes.string,
  addLanguage: PropTypes.func,
  updateLanguage: PropTypes.func,
  removeLanguage: PropTypes.func,
  closeForm: PropTypes.func,
};

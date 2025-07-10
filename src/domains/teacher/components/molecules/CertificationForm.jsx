import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { NumberInput } from "../../../../shared/components/molecules/NumberInput";
import { v4 as uuidv4 } from "uuid";
export default function CertificationForm({
  id = "",
  certification = "",
  institution = "",
  year = "",
  addCard = () => {},
  updateCard = () => {},
  closePopup = () => {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      certification,
      institution,
      year,
    },
  });

  const saveNewRecord = async (data) => {
    let newId = uuidv4();
    addCard({ ...data, id: newId });
    closePopup();
  };

  const updateRecord = async (data) => {
    updateCard(data);
    closePopup();
  };

  return (
    <form
      className="p-3 gap-3 flex flex-col"
      onSubmit={handleSubmit(async (data) => {
        if (id != "") {
          await updateRecord({ ...data, id });
        } else {
          await saveNewRecord(data);
        }
      })}
    >
      <TextInput
        id="certification"
        maxLength={50}
        label={"Certification Name"}
        placeholder="Certification name"
        errorMessage={errors.certification?.message}
        register={register("certification", {
          required: "Certification name is required",
          minLength: { value: 2, message: "Minimum 2 characters" },
          maxLength: { value: 100, message: "Maximum 100 characters" },
        })}
      />
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <TextInput
          id="institution"
          label={"Institution"}
          placeholder="Institution"
          errorMessage={errors.institution?.message}
          maxLength={50}
          register={register("institution", {
            required: "Institution is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
            maxLength: { value: 50, message: "Maximum 50 characters" },
          })}
        />
        <NumberInput
          id="year"
          name="year"
          type="number"
          label={"Year"}
          errorMessage={errors.year?.message}
          register={register("year", {
            required: "Year is required",
            min: { value: 1900, message: "Year must be after 1900" },
            max: {
              value: new Date().getFullYear(),
              message: "Year cannot be in the future",
            },
          })}
        />
      </div>

      <div className="flex justify-around gap-3 w-full mt-4">
        <Button color="default" variant="bordered" onClick={closePopup}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} isSpinning={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}

CertificationForm.propTypes = {
  id: PropTypes.string,
  certification: PropTypes.string,
  institution: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

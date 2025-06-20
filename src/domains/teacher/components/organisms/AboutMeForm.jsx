import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";

export function AboutMeForm() {
  const [description, setDescription] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    if (!description) setErrors([...errors, "This field is required"]);
  };

  const handleDelete = () => {
    setDescription("");
  };

  const handleOnChange = (e) => {
    setErrors([]);
    setDescription(e.target.value);
  };

  return (
    <div className="about-me-card flex flex-col justify-stretch gap-2.5 p-2">
      <div className="h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <TextAreaInput
              label="Description"
              id="description"
              rows={5}
              placeholder="Description"
              errorMessage={errors[0] || ""}
              register={{
                name: "description",
                onChange: handleOnChange,
                value: description,
              }}
            />
          </div>
          <div className="flex justify-around mt-4">
            <Button onClick={handleDelete} color="danger" variant="bordered">
              Delete
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

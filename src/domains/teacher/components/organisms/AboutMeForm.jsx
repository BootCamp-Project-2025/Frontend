import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";
import PropTypes from "prop-types";

export function AboutMeForm({ text, setText, closePopup }) {
  const [description, setDescription] = useState(text);
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    if (!description) setErrors([...errors, "This field is required"]);
    setText(description);
    closePopup();
  };

  const handleDelete = () => {
    closePopup();
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
            <Button onClick={handleDelete} color="default" variant="bordered">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

AboutMeForm.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
  closePopup: PropTypes.func,
};

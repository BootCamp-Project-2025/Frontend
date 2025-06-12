import Textarea from "../../../../shared/components/atoms/Textarea";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";

export default function AboutMeForm() {
  const [description, setDescription] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    console.log(description);
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
    <div className="flex flex-col h-full justify-between">
      <div>
        <Textarea
          label="Description"
          value={description}
          onChange={handleOnChange}
          rows={"5"}
          errors={errors}
        />
      </div>
      <div className="flex justify-around">
        <Button onClick={handleDelete} styleType="deleteBtn">
          Delete
        </Button>
        <Button onClick={handleSubmit} styleType="addBtn">
          Save
        </Button>
      </div>
    </div>
  );
}

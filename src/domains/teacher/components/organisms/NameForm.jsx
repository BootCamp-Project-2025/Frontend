import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import PropTypes from "prop-types";

export function NameForm({ user, setUser, onClose = () => {} }) {
  const [name, setName] = useState(user.name);
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrors(["This field is required"]);
      return;
    }
    setUser({
      ...user,
      name,
    });

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleOnChange = (e) => {
    setErrors([]);
    setName(e.target.value);
  };

  return (
    <div className="name-card flex flex-col justify-stretch gap-2.5 p-2">
      <div className="h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <TextInput
              label="Name"
              id="name"
              placeholder="Your full name"
              errorMessage={errors[0] || ""}
              register={{
                name: "name",
                onChange: handleOnChange,
                value: name,
              }}
            />
          </div>
          <div className="flex justify-around mt-4">
            <Button onClick={handleClose} color="default" variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

NameForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
  setUser: PropTypes.func,
};

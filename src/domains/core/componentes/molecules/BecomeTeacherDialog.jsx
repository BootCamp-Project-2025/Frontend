import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { useState } from "react";

export const BecomeTeacherDialog = ({
  onCancel = () => {},
  onContinue = () => {},
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  const steps = [
    {
      title: "Complete your teacher profile",
      description:
        "Add the necessary information to become a teacher on LTCrowd: About Me, Education, Certifications, Languages, and more.",
      icon: "business_center",
    },
    {
      title: "Create your courses",
      description:
        "Start creating any course you want, the type or topic doesn’t matter. Just choose the one that inspires you the most.",
      icon: "school",
    },
    {
      title: "Stand out among all",
      description:
        "Create quality content in your courses to stand out and receive more student traffic!",
      icon: "workspace_premium",
    },
  ];

  return (
    <div className="text-gray-900 p-8 w-full">
      <p className="text-2xl font-semibold">
        Start creating your teacher profile, teach many students, and raise the
        quality of education.
      </p>

      {steps.map((step, index) => {
        return (
          <div key={index} className="border-b py-5 flex items-center gap-9">
            <p className="p-2.5 text-2xl w-12 h-12 min-w-12 min-h-12 text-center border rounded-full font-bold">
              {index + 1}
            </p>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "3rem" }}
            >
              {step.icon}
            </span>
            <div>
              <p className="text-base font-bold">{step.title}</p>
              <p className="text-base">{step.description}</p>
            </div>
          </div>
        );
      })}

      <div className="flex gap-3 justify-center py-5 items-center">
        <input
          type="checkbox"
          id="checkBoxConditions"
          checked={acceptedTerms}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkBoxConditions">
          I accept the terms and conditions to become a teacher on the LTCrowd
          platform.
        </label>
      </div>

      <div className="flex justify-center gap-10">
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onContinue} disabled={!acceptedTerms}>
          Continue
        </Button>
      </div>
    </div>
  );
};

BecomeTeacherDialog.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
};

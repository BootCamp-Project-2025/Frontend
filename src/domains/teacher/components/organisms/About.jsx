import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { useState } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { AboutMeForm } from "./AboutMeForm";
import { Button } from "../../../../shared/components/atoms/Button";

const mockInformation = `
Tell others a bit about your background, skills, and interests...
`;

const About = () => {
  const [information, setInformation] = useState(mockInformation);

  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "About me Form",
        children: (
          <AboutMeForm
            text={information}
            setText={setInformation}
            closePopup={closePopup}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  return (
    <div className="flex flex-col gap-2 flex-[0.5]">
      <div className="flex items-center gap-2">
        <Title size="lg" color="default">
          About me
        </Title>
        <Button
          color="default"
          radius="full"
          square
          size="sm"
          onClick={handleOpenPopup}
          className={
            "p-0 w-2 flex justify-center bg-[color:var(--color-secondary-100)]"
          }
        >
          <Icon icon={"edit"} className={"min-w-4"} />
        </Button>
      </div>
      <p className="text-[color:var(--color-default-500)] ">{information}</p>
    </div>
  );
};

export default About;

About.propTypes = {
  text: PropTypes.string,
};

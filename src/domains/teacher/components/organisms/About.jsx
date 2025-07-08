import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { useState } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { AboutMeForm } from "./AboutMeForm";
import { Button } from "../../../../shared/components/atoms/Button";

const mockInformation = `
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta nulla
      ipsa dignissimos quod amet asperiores! Nobis, aliquam quaerat voluptas
      fugit maxime distinctio, a aperiam assumenda repellat
      accusantium quibusdam! Itaque odio natus exercitationem illum autem
      aspernatur vel qui laudantium quasi incidunt possimus repudiandae quisquam
      quaerat aperiam eos eaque et ipsum adipisci laboriosam labore.
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
        <Button onClick={handleOpenPopup} variant="ghost">
          <Icon icon="edit" className={"cursor-pointer self-start"} />
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

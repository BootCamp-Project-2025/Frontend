import usePopup from "../../../../shared/hooks/usePopup";
import { AboutMeForm } from "./AboutMeForm";
import { Button } from "../../../../shared/components/atoms/Button";
import { ProfileSection } from "../molecules/ProfileSection";
import { useState } from "react";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { Icon } from "../../../../shared/components/atoms/Icon";

const mockInformation = `
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta nulla
      ipsa dignissimos quod amet asperiores! Nobis, aliquam quaerat voluptas
      fugit maxime distinctio, a error maiores aperiam assumenda repellat
      accusantium quibusdam! Itaque odio natus exercitationem illum autem
      aspernatur vel qui laudantium quasi incidunt possimus repudiandae quisquam
      quaerat aperiam eos eaque et ipsum adipisci laboriosam labore rerum,
      cumque deleniti, delectus accusamus? Sequi? Repellendus possimus fugiat
      dolorem reprehenderit veritatis laborum quia asperiores nulla quod tempore
      dolore alias iusto sapiente ipsum nostrum itaque, debitis aspernatur
      explicabo animi, molestiae minus, neque optio quae nobis. Voluptatibus!
      Reiciendis ipsa cumque iusto saepe voluptate aspernatur voluptatem fugiat
      blanditiis, animi est odit neque architecto consectetur iure consequatur
      doloremque, nam, fuga cum. Esse accusantium ipsa nobis cum dolore, ea
      reprehenderit! Fugiat neque sequi nulla. Perferendis iste recusandae error
      voluptatibus quidem necessitatibus dolorum blanditiis! Soluta itaque harum
      accusamus voluptatibus sunt aspernatur corporis earum, neque aperiam a
      quas ut magnam ex iusto.
`;

export default function AboutMeSection() {
  // eslint-disable-next-line no-unused-vars
  const [information, setInformation] = useState(mockInformation);

  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "About me Form",
        children: <AboutMeForm />,
        onClose: closePopup,
      },
      true
    );
  };

  return (
    <ProfileSection title="About me">
      <p className="about-me-content-text font-normal">{information}</p>
      <div>
        <Button onClick={handleOpenPopup}>
          <Icon icon="edit" />
          Edit About me
        </Button>
      </div>
    </ProfileSection>
  );
}

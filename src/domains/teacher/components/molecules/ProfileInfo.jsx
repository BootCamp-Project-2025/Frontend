import profile from "../../../../assets/profile.png";
import { Image } from "../../../../shared/components/atoms/Image";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { useState } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { Button } from "../../../../shared/components/atoms/Button";
import { NameForm } from "../organisms/NameForm";

const mockUser = {
  name: "Martin Cardozo",
  email: "martin.cardozo@gmail.com",
  image: profile,
};

const ProfileInfo = () => {
  const [user, setUser] = useState(mockUser);

  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Name",
        children: (
          <NameForm onClose={closePopup} user={user} setUser={setUser} />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  return (
    <div className="flex items-center gap-8 flex-wrap">
      <Image
        src={user.image}
        alt={`${user.name} profile image`}
        width="w-auto"
        height="h-full"
        styleType="profile"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Title size="xl" color="default">
            {user.name}
          </Title>
          <Button onClick={handleOpenPopup} variant="ghost">
            <Icon icon="edit" className={"cursor-pointer self-start"} />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Icon icon="email" />
          <p className="text-[var(--color-default-500)]">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

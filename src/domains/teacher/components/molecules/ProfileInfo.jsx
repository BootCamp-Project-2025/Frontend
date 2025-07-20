import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { Button } from "../../../../shared/components/atoms/Button";
import { NameForm } from "../organisms/NameForm";
import PropTypes from "prop-types";
import { useState } from "react";
import AvatarProfile from "../../../../shared/components/organisms/AvatarProfile";
import { useFreelancerResources } from "../../../../shared/hooks/useFreelancerResources";

const ProfileInfo = ({ user }) => {
  const [localUser, setLocalUser] = useState(user);
  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Name",
        children: (
          <NameForm
            onClose={closePopup}
            user={localUser}
            setUser={updateCard}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  const { updateCard } = useFreelancerResources({
    freelancerId: localUser.userName,
    resourceType: "name",
    recordList: localUser,
    setRecordList: setLocalUser,
    closePopup,
  });

  return (
    <div className="flex items-center gap-8 flex-wrap">
      <AvatarProfile profilePicture={localUser.profilePicture} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Title
            size="xl"
            color="default"
            className="2xl:text-4xl font-extrabold"
          >
            {localUser.userName}
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

        <div className="flex items-center gap-1">
          <Icon icon="email" />
          <p className="text-[var(--color-default-500)]">
            {localUser.userEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

import { Link } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { Button } from "../../../../shared/components/atoms/Button";
import { NameForm } from "../organisms/NameForm";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AvatarProfile from "../../../../shared/components/organisms/AvatarProfile";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import About from "../organisms/About";
import { patchRequest } from "../../../../shared/api/patchRequest";

const ProfileInfo = ({ user, handleUpdateUser }) => {
  const { openPopup, closePopup } = usePopup();
  const [localUser, setLocalUser] = useState(user || null);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handlePatchField = async (field, value) => {
    const updatedUser = { ...localUser, [field]: value };

    try {
      const res = await patchRequest(`/users/${localUser.id}`, {
        [field]: value,
      });

      handleUpdateUser(res.data.data);

      if (res.success) {
        setLocalUser(updatedUser);
        showToast(`${field} updated`, "success");
      } else {
        showToast(`Error updating ${field}`, "error");
        console.error("Error updating", res.error);
      }
    } catch (err) {
      console.error("Unexpected error", err);
      showToast(`Unexpected error updating ${field}`, "error");
    }
  };

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Name",
        children: (
          <NameForm
            onClose={closePopup}
            user={localUser}
            updateName={(name) => handlePatchField("userName", name)}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  if (!localUser) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <div className="flex gap-8 items-center">
          <AvatarProfile
            profilePicture={localUser.profilePicture}
            updateProfilePicture={(picture) =>
              handlePatchField("profilePicture", picture)
            }
          />

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
        <div className="flex:col md:flex gap-24 md:gap-0 justify-around items-center w-1/2">
          <div className="flex flex-col justify-center gap-4 border-2 border-[color:var(--color-primary-600)] rounded-lg p-4 max-h-min max-w-min mt-8 md:mt:0">
            <div className="flex items-center gap-16">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-2xl text-[color:var(--color-default-800)] font-bold">
                  Courses
                </h3>
                <p className="text-xl text-[color:var(--color-default-500)] font-bold">
                  3
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-2xl text-[color:var(--color-default-800)] font-bold">
                  Students
                </h3>
                <p className="text-xl text-[color:var(--color-default-500)] font-bold">
                  30
                </p>
              </div>
            </div>
            <Link
              to={"/dashboard"}
              className="self-end text-sm text-[color:var(--color-default-400)] hover:text-[color:var(--color-default-800)]"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
      <About
        text={localUser.about}
        updateAbout={(about) => handlePatchField("about", about)}
      />
    </div>
  );
};

export default ProfileInfo;

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    profilePicture: PropTypes.string,
    about: PropTypes.string,
  }),
  handleUpdateUser: PropTypes.func,
};

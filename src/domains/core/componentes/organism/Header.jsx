import { useEffect, useState } from "react";
import { NavBarLogo } from "../atoms/NavBarLogo";
import { HeaderButtons } from "../molecules/HeaderButtons";
import { AvatarMenuDropDown } from "../molecules/AvatarMenuDropDown";
import { OptionsDropDown } from "../molecules/OptionsDropDown";
import { HeaderOptions } from "../molecules/HeaderOptions";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../../../teacher/components/atoms/PopupFormLayout";
import { BecomeTeacherDialog } from "../molecules/BecomeTeacherDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { updateRoles } from "../../../../shared/api/AuthApi";
import PropTypes from "prop-types";

export const Header = ({ complete = true }) => {
  const {
    handleLogin,
    handleLogout,
    user: authUser,
    isAuthenticated,
    handleSignUp,
    updateSessionRoles,
  } = useAuth();

  const navigate = useNavigate();
  const { openPopup, closePopup } = usePopup();

  const handleOpenPopup = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "",
        children: (
          <BecomeTeacherDialog
            onCancel={closePopup}
            onContinue={acceptBecomeTeacher}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };
  const acceptBecomeTeacher = async () => {
    closePopup();
    await updateRoles("FREELANCER");
    await updateSessionRoles();
    navigate("/dashboard/teacher/profile");
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const signIn = () => handleLogin();
  const signUp = () => {
    handleSignUp();
  };
  const logOut = () => {
    navigate("/");
    handleLogout();
  };

  const becomeTeacher = () => {
    handleOpenPopup();
  };

  const switchToTeacher = () => {
    navigate("/teacher/profile");
  };
  const switchToStudent = () => {
    navigate("/");
  };

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  return (
    <header
      className={`flex items-center justify-center h-[5.625rem] ${complete ? "border-gray-300 shadow-md sticky top-0" : ""} bg-white  z-10`}
    >
      <div
        className={`flex justify-between ${complete ? "justify-between" : "justify-end"} items-center  w-[90%] `}
      >
        {complete && (
          <>
            <NavBarLogo></NavBarLogo>
            <nav className="hidden md:flex  w-full justify-center gap-10  ">
              <HeaderOptions></HeaderOptions>
            </nav>
          </>
        )}

        <div className="hidden md:flex  gap-5 items-center">
          <HeaderButtons
            user={user}
            becomeTeacher={becomeTeacher}
            logOut={logOut}
            signIn={signIn}
            signUp={signUp}
            switchToTeacher={switchToTeacher}
            switchToStudent={switchToStudent}
          ></HeaderButtons>

          {isAuthenticated && user && (
            <AvatarMenuDropDown
              className="hidden md:flex h-[2.6rem]"
              userName={user?.userName}
              avatarURL={user?.avatarURL}
            >
              <OptionsDropDown
                avatarURL={user?.avatarURL}
                userName={user?.userName}
                userEmail={user?.userEmail}
                logOut={logOut}
              />
            </AvatarMenuDropDown>
          )}
        </div>

        <Button
          color="secondary"
          variant="ghost"
          className={"md:hidden"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="material-symbols-outlined">close</span>
          ) : (
            <span className="material-symbols-outlined">dehaze</span>
          )}
        </Button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
            <div className="flex flex-col w-[90%] gap-1">
              <>
                <HeaderOptions></HeaderOptions>
                <HeaderButtons
                  user={user}
                  becomeTeacher={becomeTeacher}
                  logOut={logOut}
                  signIn={signIn}
                  signUp={signUp}
                  switchToTeacher={switchToTeacher}
                  switchToStudent={switchToStudent}
                ></HeaderButtons>
                {user && (
                  <OptionsDropDown
                    avatarURL={user?.avatarURL}
                    userName={user?.userName}
                    userEmail={user?.userEmail}
                    logOut={logOut}
                  />
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  complete: PropTypes.bool,
};

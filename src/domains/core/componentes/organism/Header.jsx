import { useState } from "react";
import { NavBarLogo } from "../atoms/NavBarLogo";
import { HeaderButtons } from "../molecules/HeaderButtons";
import { AvatarMenuDropDown } from "../molecules/AvatarMenuDropDown";
import { OptionsDropDown } from "../molecules/OptionsDropDown";
import { HeaderOptions } from "../molecules/HeaderOptions";
import { Button } from "../../../../shared/components/atoms/Button";

export const Header = () => {
  const defaultUser = {
    userName: "Jose Medina",
    avatarURL:
      "https://wallpapers.com/images/featured-full/fotos-de-perfil-xj8jigxkai9jag4g.jpg",
    userEmail: "jose.medina@gmail.com",
    isTeacher: false,
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = () => setUser({ ...defaultUser });
  const signUp = () => {};
  const logOut = () => setUser(null);
  const becomeTeacher = () => setUser({ ...defaultUser, isTeacher: true });
  const switchToTeacher = () => {};

  return (
    <header className="flex items-center justify-center h-[5.625rem] border-gray-300 shadow-md bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center  w-[90%] ">
        <NavBarLogo></NavBarLogo>
        <nav className="hidden md:flex  w-full justify-center gap-10  ">
          <HeaderOptions></HeaderOptions>
        </nav>

        <div className="hidden md:flex  gap-5 items-center">
          <HeaderButtons
            user={user}
            becomeTeacher={becomeTeacher}
            logOut={logOut}
            signIn={signIn}
            signUp={signUp}
            switchToTeacher={switchToTeacher}
          ></HeaderButtons>

          {user && (
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

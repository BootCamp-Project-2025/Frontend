import { useState } from "react";
import LTCrowgLogo from "../../../assets/LTCrowdLogo.svg";
import { Button } from "../atoms/Button";
import { HeaderOption } from "../atoms/HeaderOption";
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-center h-[5.625rem] border-gray-300 shadow-md bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center  w-[90%] ">
        <img
          src={LTCrowgLogo}
          alt="Logo LTCrowd"
          className="h-[1.8rem] md:h-[2.1rem] cursor-pointer"
        />
        <nav className="hidden md:flex  w-full justify-center gap-10  ">
          <HeaderOption to={"/"}> Home</HeaderOption>
          <HeaderOption to={"/courses"}> Courses</HeaderOption>
          <HeaderOption to={"/teachers"}> Teachers</HeaderOption>
        </nav>
        <div className="hidden md:flex  gap-5">
          <Button className="text-nowrap">Sign In</Button>
          <Button color="secondary" className="text-nowrap">
            Sing up
          </Button>
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
            <div className="flex flex-col w-[90%] gap-4">
              <HeaderOption className="w-full" to={"/"}>
                Home
              </HeaderOption>
              <HeaderOption className="w-full" to={"/courses"}>
                Courses
              </HeaderOption>
              <HeaderOption className="w-full" to={"/teachers"}>
                Teachers
              </HeaderOption>

              <Button className="w-full text-nowrap flex justify-center">
                Sign In
              </Button>
              <Button
                color="secondary"
                className="w-full text-nowrap flex justify-center"
              >
                Sing up
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

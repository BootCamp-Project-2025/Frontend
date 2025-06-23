import LTCrowgLogo from "../../../assets/LTCrowdLogo.svg";
import { Button } from "../atoms/Button";
import { HeaderOption } from "../atoms/HeaderOption";
export const Header = () => {
  return (
    <header className="flex items-center justify-center h-[5.625rem] border-gray-300 shadow-md bg-white">
      <div className="flex justify-between items-center  w-[90%] ">
        <img src={LTCrowgLogo} alt="Logo LTCrowd" className="h-[2.2rem]" />
        <div className="flex w-full justify-center gap-10  ">
          <HeaderOption to={"/"}> Home</HeaderOption>
          <HeaderOption to={"/courses"}> Courses</HeaderOption>
          <HeaderOption to={"/teachers"}> Teachers</HeaderOption>
        </div>
        <div className="flex gap-5">
          <Button className="text-nowrap">Sign In</Button>
          <Button color="secondary" className="text-nowrap">
            Sing up
          </Button>
        </div>
      </div>
    </header>
  );
};

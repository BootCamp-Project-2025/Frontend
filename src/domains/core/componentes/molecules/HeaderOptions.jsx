import { HeaderOption } from "../atoms/HeaderOption";

export const HeaderOptions = () => {
  return (
    <>
      <HeaderOption to={"/"}> Home</HeaderOption>
      <HeaderOption to={"/courses"}> Courses</HeaderOption>
      <HeaderOption to={"/teachers"}> Teachers</HeaderOption>
    </>
  );
};

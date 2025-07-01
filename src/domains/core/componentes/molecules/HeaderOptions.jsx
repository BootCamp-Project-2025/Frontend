import { useLocation } from "react-router-dom";
import { HeaderOption } from "../atoms/HeaderOption";

export const HeaderOptions = () => {
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");
  if (isTeacherRoute) {
    return <></>;
  }
  return (
    <>
      <HeaderOption to={"/"}> Home</HeaderOption>
      <HeaderOption to={"/courses"}> Courses</HeaderOption>
      <HeaderOption to={"/teachers"}> Teachers</HeaderOption>
    </>
  );
};

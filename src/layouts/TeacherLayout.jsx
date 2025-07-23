import { Outlet } from "react-router-dom";
import { TeacherSidebar } from "../shared/components/organisms/TeacherSidebar";
import { Header } from "../domains/core/componentes/organism/Header";

export const TeacherLayout = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <TeacherSidebar />
      <div className=" w-full flex flex-col">
        <Header complete={false}></Header>
        <Outlet />
      </div>
    </div>
  );
};

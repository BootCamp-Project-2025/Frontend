import { Header } from "../domains/core/componentes/organism/Header";
import { Outlet } from "react-router-dom";
import { StudentSidebar } from "../shared/components/organisms/StudentSidebar";

export const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <StudentSidebar />
      <div className=" w-full flex flex-col">
        <Header complete={false}></Header>
        <Outlet />
      </div>
    </div>
  );
};

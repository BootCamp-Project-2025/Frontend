import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared/components/organisms/Sidebar";
import { Header } from "../domains/core/componentes/organism/Header";

export const TeacherLayOut = () => {
  return (
    <>
      <div id="teahcerWorkspaceLayout" className="min-h-screen flex flex-row">
        <Sidebar />
        <div className="mainContent  w-full">
          <Header complete={false}></Header>
          <Outlet />
        </div>
      </div>
    </>
  );
};

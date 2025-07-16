import { Header } from "../domains/core/componentes/organism/Header";
import { Outlet } from "react-router-dom";
import { SidebarStudent } from "../shared/components/organisms/SidebarStudent";

export const StudentLayOut = () => {
  return (
    <>
      <div id="teahcerWorkspaceLayout" className="min-h-screen flex flex-row">
        <SidebarStudent />
        <div className="mainContent  w-full">
          <Header complete={false}></Header>
          <Outlet />
        </div>
      </div>
    </>
  );
};

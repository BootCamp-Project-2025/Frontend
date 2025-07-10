import { Header } from "../../../domains/core/componentes/organism/Header";
import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
export const Dashboard = () => {
  return (
    <>
      <main style={{ maxWidth: "100%", padding: "0" }} id="teacherLayout">
        <Header></Header>
        <Sidebar />
        <section id="mainSection" className="flex flex-col w-full">
          <Outlet />
        </section>
      </main>
    </>
  );
};

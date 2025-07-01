import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <main>
      <Sidebar />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

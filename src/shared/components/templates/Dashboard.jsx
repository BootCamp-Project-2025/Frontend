import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <main
      className="flex direccion-row"
      style={{ maxWidth: "100%", padding: "0" }}
    >
      <Sidebar />
      <section className="flex w-full">
        <Outlet />
      </section>
    </main>
  );
};

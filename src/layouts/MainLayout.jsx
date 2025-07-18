import { Outlet } from "react-router-dom";
import { Header } from "../domains/core/componentes/organism/Header.jsx";
import { Footer } from "../domains/core/componentes/molecules/Footer.jsx";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className=" min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

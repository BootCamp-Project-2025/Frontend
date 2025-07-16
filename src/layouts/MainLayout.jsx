import { Outlet } from "react-router-dom";
import { Header } from "../domains/core/componentes/organism/Header.jsx";
import { Footer } from "../domains/core/componentes/molecules/Footer.jsx";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="max-w-[90rem] px-8 py-4 mx-auto min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

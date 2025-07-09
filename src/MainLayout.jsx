import { Footer } from "./domains/core/componentes/molecules/Footer.jsx";
import { Header } from "./domains/core/componentes/organism/Header.jsx";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

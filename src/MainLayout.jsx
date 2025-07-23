import { useEffect, useState } from "react";
import { Footer } from "./domains/core/componentes/molecules/Footer.jsx";
import { Header } from "./domains/core/componentes/organism/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    setShowFooter(!location.pathname.includes("chat"));
  }, [location]);
  return (
    <>
      <Header />
      <Outlet />
      {showFooter ? <Footer /> : null}
    </>
  );
};

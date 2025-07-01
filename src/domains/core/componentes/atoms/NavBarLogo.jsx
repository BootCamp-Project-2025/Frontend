import React from "react";
import { useNavigate } from "react-router-dom";
import LTCrowgLogo from "../../../../assets/LTCrowdLogo.svg";

export const NavBarLogo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={LTCrowgLogo}
      alt="Logo LTCrowd"
      className="h-[1.8rem] md:h-[2.1rem] cursor-pointer"
      onClick={() => navigate("/")}
    />
  );
};

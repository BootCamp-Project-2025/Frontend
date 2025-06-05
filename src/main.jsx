import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { PopupProvider } from "./shared/contexts/PopupContext.jsx";
import PopupRoot from "./shared/components/atoms/Popup";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PopupProvider>
      <Router />
      <PopupRoot />
    </PopupProvider>
  </StrictMode>
);

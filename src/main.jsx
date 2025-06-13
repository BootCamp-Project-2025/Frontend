import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { PopupProvider } from "./shared/contexts/PopupContext.jsx";
import PopupRoot from "./shared/components/atoms/Popup";
import { ToastProvider } from "./shared/contexts/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <PopupProvider>
        <Router />
        <PopupRoot />
      </PopupProvider>
    </ToastProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { PopupProvider } from "./shared/contexts/PopupContext.jsx";
import PopupRoot from "./shared/components/atoms/Popup";
import { ToastProvider } from "./shared/contexts/ToastContext.jsx";
import "material-symbols";
import { AuthProvider } from "./shared/hooks/useAuth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <PopupProvider>
          <Router />
          <PopupRoot />
        </PopupProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);

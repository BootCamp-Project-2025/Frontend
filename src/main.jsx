import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { PopupProvider } from "./shared/contexts/PopupContext.jsx";
import PopupRoot from "./shared/components/atoms/Popup";
import { ToastProvider } from "./shared/contexts/ToastContext.jsx";
import "material-symbols";
import { AuthProvider } from "./shared/providers/AuthProvider.jsx";
import { SocketProvider } from "./domains/chat/providers/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <SocketProvider>
          <PopupProvider>
            <Router />
            <PopupRoot />
          </PopupProvider>
        </SocketProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);

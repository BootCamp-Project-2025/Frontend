import { createContext, useContext, useCallback, useState } from "react";
import { Toast } from "../components/molecules/Toast";
import PropTypes from "prop-types";

const ToastContext = createContext({
  showToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((text, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
      }}
    >
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} closeToast={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastContext must be used inside a ToastProvider");
  }
  return ctx;
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// PopupContext.jsx
import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

PopupProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const PopupContext = createContext({
  isOpen: false,
  Component: null,
  componentProps: {},
  openPopup: () => {},
  closePopup: () => {},
  isDismisable: false,
});

export function PopupProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Component, setComponent] = useState(null);
  const [componentProps, setComponentProps] = useState({});
  const [isDismisable, setIsDismisable] = useState(false);

  const openPopup = useCallback((Comp, props = {}, isDismisable) => {
    setComponent(() => Comp);
    setComponentProps(props);
    setIsOpen(true);
    setIsDismisable(isDismisable);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setComponent(null);
    setComponentProps({});
    setIsDismisable(false);
  }, []);

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        Component,
        componentProps,
        openPopup,
        closePopup,
        isDismisable,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopupContext() {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopupContext must be used inside a PopupProvider");
  }
  return ctx;
}

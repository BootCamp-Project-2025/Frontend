import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopupContext } from "../../contexts/PopupContext";

export default function PopupRoot() {
  const { isOpen, Component, componentProps, closePopup, isDismisable } =
    usePopupContext();
  const [isClosing, setIsClosing] = useState(false);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setTimeout(() => {
        overlayRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      closePopup();
      setIsClosing(false);
    }, 300);
  }, [closePopup]);

  if (!isOpen || !Component) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.warn("#modal-root is not found in DOM");
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      tabIndex={-1}
      onClick={isDismisable ? handleClose : undefined}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isDismisable) {
          handleClose();
        }
      }}
      className={`
        fixed inset-0 
        bg-black/50 
        flex justify-center items-center 
        z-50 
        focus:outline-none 
        transition-opacity duration-300 ease-out 
        ${isClosing ? "opacity-0" : "opacity-100"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white 
          rounded-2xl
          p-4 
          max-w-[90vw] max-h-[90vh] 
          overflow-auto 
          inline-block 
          transform transition-all duration-300 ease-out 
          ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        `}
      >
        <Component {...componentProps} closePopup={handleClose} />
      </div>
    </div>,
    modalRoot
  );
}

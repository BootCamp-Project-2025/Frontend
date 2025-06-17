import { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { Title } from "./Title";
import { Icon } from "./Icon";
export const DialogContainer = ({
  isOpen = true,
  onClose = () => {},
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector("html").style.overflowY = "hidden";
    } else {
      document.querySelector("html").style.overflowY = "auto";
    }
    return () => {
      document.querySelector("html").style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`${!isOpen ? "hidden" : ""} fixed w-screen h-screen top-0 left-0 bg-gray-900/70 flex justify-center items-center z-10 `}
      onDoubleClick={onClose}
    >
      <div
        className="bg-white rounded-md relative p-4 flex flex-col"
        // onDoubleClick={(e) => {
        //   e.stopPropagation();
        // }}
      >
        <div>
          <Title>Title</Title>
        </div>
        {children}
        <Button
          aria-label="Close form"
          color="default"
          radius="full"
          onClick={onClose}
          square
          className={"absolute top-4 right-4"}
        >
          <Icon icon="close" className="w-2 h-2" />
        </Button>
      </div>
    </div>
  );
};

DialogContainer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
};

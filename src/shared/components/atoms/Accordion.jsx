import PropTypes from "prop-types";
import { useState } from "react";

export const Accordion = ({ title = "title accordion", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex w-full">
        <div className="md:hidden w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center border-b border-gray-400 cursor-pointer hover:bg-primary-50  py-2 "
          >
            <p className="font-semibold text-xl text-primary-500">{title}</p>
            <span
              className={`material-symbols-outlined  transition-all duration-100 text-primary-500 ${isOpen ? "rotate-90" : ""} `}
            >
              arrow_forward_ios
            </span>
          </button>
          {isOpen && children}
        </div>

        <div className="hidden md:flex md:flex-col gap-4 ">
          <p className="font-semibold text-base text-primary-500">{title}</p>
          {children}
        </div>
      </div>
    </>
  );
};
Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

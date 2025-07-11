import { useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "./Icon";

export const Slider = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstChild = container.firstChild;
    if (!firstChild) return;

    const cardWidth = firstChild.clientWidth;
    const scrollAmount = Math.min(cardWidth * 1.5, container.clientWidth);

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className=" absolute left-0 top-1/2 -translate-y-1/2 z-0  cursor-pointer bg-gray-300/70 hover:bg-gray-300 rounded-full  w-12 h-12 flex justify-center items-center rotate-180"
      >
        <Icon icon={"arrowForward"} className={""}></Icon>
      </button>
      <div
        className="overflow-x-auto scroll-smooth flex space-x-4 px-10 py-4 scroll z-0"
        ref={scrollRef}
        style={{ scrollbarWidth: "none" }}
        id="slider"
      >
        {children}
      </div>

      <button
        onClick={() => scroll("right")}
        className=" absolute right-0 top-1/2 -translate-y-1/2 z-0 cursor-pointer  bg-gray-300/70 hover:bg-gray-300 rounded-full  w-12 h-12 flex justify-center items-center"
      >
        <Icon icon={"arrowForward"} className={""}></Icon>
      </button>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.element,
};

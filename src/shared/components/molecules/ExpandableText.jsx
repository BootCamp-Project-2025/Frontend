import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";

export const ExpandableText = ({ text = "", maxLines = 3, title }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      const { scrollHeight, clientHeight } = descRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [text, maxLines]);

  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: maxLines,
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {title && <h3 className="font-semibold">{title}</h3>}

      <p
        ref={descRef}
        style={expanded ? undefined : clampStyle}
        className="transition-all"
      >
        {text}
      </p>

      {isOverflowing && (
        <div>
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => setExpanded((prev) => !prev)}
          >
            <span className="font-bold">
              {expanded ? "Show less" : "Show more"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className={`ml-1 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path d="M480-312 208-584l88-88 184 184 184-184 88 88-272 272Z" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

ExpandableText.propTypes = {
  text: PropTypes.string,
  maxLines: PropTypes.number,
  title: PropTypes.string,
};

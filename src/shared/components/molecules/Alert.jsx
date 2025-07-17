import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Icon } from "../atoms/Icon";

const iconMap = {
  error: {
    svg: <Icon className={"w-5 h-5 fill-red-400"} icon={"errorCircle"}></Icon>,
    containerClass: "bg-red-50 border-red-300 text-red-700",
    bulletClass: "bg-red-700",
  },
  info: {
    svg: <Icon className="w-5 h-5 fill-blue-400" icon={"infoCircle"}></Icon>,
    containerClass: "bg-blue-50 border-blue-300 text-blue-700",
    bulletClass: "bg-blue-700",
  },
  success: {
    svg: <Icon className="w-5 h-5 fill-green-400" icon={"checkCircle"}></Icon>,
    containerClass: "bg-green-50 border-green-300 text-green-700",
    bulletClass: "bg-green-700",
  },
  warn: {
    svg: <Icon className="w-5 h-5 fill-yellow-400" icon={"warning"}></Icon>,
    containerClass: "bg-yellow-50 border-yellow-300 text-yellow-700",
    bulletClass: "bg-yellow-700",
  },
};

export const Alert = ({
  type = "info",
  title = "Default Title",
  description = "",
  list = [],
  visibleTime,
  children,
}) => {
  const [visible, setVisible] = useState(true);
  const icon = iconMap[type] ?? iconMap["info"];

  useEffect(() => {
    let timer = null;
    const ms = parseInt(visibleTime);
    if (visibleTime !== undefined && !isNaN(ms)) {
      timer = setTimeout(() => {
        setVisible(false);
      }, ms);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visibleTime]);

  if (!visible) return null;

  return (
    <div
      className={`p-4 rounded-md w-full flex gap-3 border ${icon.containerClass}`}
      style={{
        alignItems: description !== "" || list.length > 0 ? "start" : "center",
      }}
    >
      <div>{icon.svg}</div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="text-sm">{description}</p>}
        {list.map((element, i) => (
          <p key={`list-option-${i}`} className="pl-3.5 text-sm relative">
            <span
              className={`absolute w-1.5 h-1.5 left-0 top-2 rounded-full ${icon.bulletClass}`}
            ></span>
            {element}
          </p>
        ))}
        {children}
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  visibleTime: PropTypes.number,
  children: PropTypes.element,
};

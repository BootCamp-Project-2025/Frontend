import { NavLink } from "react-router-dom";
import { Icon } from "../atoms/Icon";
import PropTypes from "prop-types";

export const SidebarRow = ({ name, route, icon }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `${isActive ? "bg-[#2e6df53a] border-l-primary-500" : " border-l-transparent"} flex items-center gap-1 px-4 py-2  text-nowrap border-l-4 ${!isActive ? "hover:bg-gray-100" : ""}  `
      }
    >
      <Icon
        icon={icon}
        className="min-w-[28px] min-h-[28px] text-gray-700"
      ></Icon>
      <span className="text-base text-gray-700 px-5 py-3 font-semibold">
        {name}
      </span>
    </NavLink>
  );
};

SidebarRow.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string,
  icon: PropTypes.string,
};

import ltcrowdLogoLt from "../../../assets/ltcrowd-logo-lt.svg";
import ltcrowdLogoCrowd from "../../../assets/ltcrowd-logo-crowd.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const SidebarLogo = ({ open = false, route = "#" }) => {
  return (
    <Link
      to={route}
      className="flex items-center py-8 h-6 pl-3 hover:bg-gray-100"
    >
      <div className="flex min-h-6 max-h-6 ">
        <img src={ltcrowdLogoLt} className="h-full" alt="ltcrowdLogoLt" />
        <img
          src={ltcrowdLogoCrowd}
          className={`h-full ${open ? "opacity-100" : "opacity-0"}  transition-all duration-400 `}
          alt="ltcrowdLogoCrowd"
        />
      </div>
    </Link>
  );
};

SidebarLogo.propTypes = {
  open: PropTypes.bool,
  route: PropTypes.string,
};

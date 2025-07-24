import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AvatarIcon } from "./AvatarIcon";

export const AvatarMenuDropDown = ({
  avatarURL = "",
  userName = "",
  children,
  className = "",
}) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setOpenUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative aspect-square ${className}`} ref={userMenuRef}>
      <AvatarIcon
        avatarURL={avatarURL}
        userName={userName}
        onClick={() => setOpenUserMenu((prev) => !prev)}
      ></AvatarIcon>
      {openUserMenu && (
        <div className="flex flex-col absolute top-full right-0 mt-2 min-w-30 min-h-15 bg-white border border-gray-200 rounded-lg shadow-lg z-20 text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

AvatarMenuDropDown.propTypes = {
  avatarURL: PropTypes.string,
  userName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

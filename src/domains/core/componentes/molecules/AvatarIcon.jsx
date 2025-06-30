import React from "react";
import PropTypes from "prop-types";

export const AvatarIcon = ({
  avatarURL = "",
  userName = "User Name",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-full rounded-full overflow-hidden border border-gray-300 hover:border-primary-500 transition-all cursor-pointer"
    >
      {avatarURL != "" ? (
        <img
          src={avatarURL}
          alt="User avatar"
          className="object-cover w-full h-full bg-gray-500 text-xs"
        />
      ) : (
        <div className=" flex justify-center items-center w-full h-full bg-primary-500">
          <p className="text-[1rem] uppercase font-bold text-white">
            {userName.charAt(0)}
          </p>
        </div>
      )}
    </button>
  );
};
AvatarIcon.propTypes = {
  avatarURL: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  onClick: PropTypes.func,
};

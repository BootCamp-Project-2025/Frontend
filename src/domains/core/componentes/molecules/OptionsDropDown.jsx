import { useLocation } from "react-router-dom";
import { AvatarMenuCard } from "./AvatarMenuCard";
import PropTypes from "prop-types";
export const OptionsDropDown = ({
  avatarURL,
  userName,
  userEmail,
  logOut = () => {},
}) => {
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");
  return (
    <>
      <AvatarMenuCard
        avatarURL={avatarURL}
        userName={userName}
        userEmail={userEmail}
      ></AvatarMenuCard>
      {!isTeacherRoute && (
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          My Courses
        </button>
      )}
      {!isTeacherRoute && (
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          Profile
        </button>
      )}

      {!isTeacherRoute && (
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          Chats
        </button>
      )}
      {!isTeacherRoute && (
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          Settigs
        </button>
      )}
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100  border-t border-gray-300"
        onClick={logOut}
      >
        Log out
      </button>
    </>
  );
};
OptionsDropDown.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  logOut: PropTypes.func,
};

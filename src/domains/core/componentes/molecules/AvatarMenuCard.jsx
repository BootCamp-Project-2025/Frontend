import PropTypes from "prop-types";
import { AvatarIcon } from "./AvatarIcon";

export const AvatarMenuCard = ({
  avatarURL = "",
  userName = "User Name",
  userEmail = "user@gmail.com",
}) => {
  return (
    <div className="flex  gap-2  py-3 px-4 border-b  border-gray-300 hover:bg-gray-100 cursor-pointer">
      <div className="h-[3rem] w-[3rem] min-h-[3rem] min-w-[3rem]">
        <AvatarIcon avatarURL={avatarURL} userName={userName}></AvatarIcon>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold ">{userName}</p>
        <p className="text-sm">{userEmail}</p>
      </div>
    </div>
  );
};
AvatarMenuCard.propTypes = {
  avatarURL: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
};

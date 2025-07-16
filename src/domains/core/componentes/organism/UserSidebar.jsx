import PropTypes from "prop-types";
import { AvatarIcon } from "../molecules/AvatarIcon";
import { Icon } from "../../../../shared/components/atoms/Icon";

export const UserSidebar = ({ user }) => {
  return (
    <aside
      className={`bg-white h-screen shadow-md border-l border-black-300 flex flex-col justify-betweenw-64 min-w-64 w-64`}
      id="userSideBar"
    >
      <AvatarIcon
        avatarURL={user ? user?.avatarURL : ""}
        userName={user ? user?.userName : "User Name"}
      ></AvatarIcon>

      <div>
        <p>Upcoming Events</p>
        <ul>
          <li>
            <Icon icon={"home"}></Icon>
            <div>
              <em>Meeting with Rodrigo</em>
              <span>Wed, 15:00 P.M</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <p>Pending Proposals</p>
        <ul>
          <li>
            <Icon icon={"home"}></Icon>
            <div>
              <em>Meeting with Rodrigo</em>
              <span>Wed, 15:00 P.M</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <p>New Proposals</p>
        <ul>
          <li>
            <Icon icon={"home"}></Icon>
            <div>
              <em>Meeting with Rodrigo</em>
              <span>Wed, 15:00 P.M</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

UserSidebar.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    isTeacher: PropTypes.bool.isRequired,
  }),
};

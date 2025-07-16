import PropTypes from "prop-types";
import { AvatarIcon } from "../molecules/AvatarIcon";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Table } from "../molecules/Table";
import { TableItem } from "../molecules/TableItem";

export const UserSidebar = ({ user }) => {
  const data = [
    {title: "Angular", user: "Pepe"},
    {title: "React", user: "Jorge"},
    {title: "DDD", user: "Jose"},
  ];

  return (
    <aside
      className={`bg-white p-4 h-screen shadow-md border-l border-black-300 flex flex-col justify-betweenw-64 min-w-64 w-64`}
      id="userSideBar"
    >
      <div className="min-h-[3rem] h-[3rem] w-[3rem] min-w-[3rem] ml-auto">
        <AvatarIcon
          avatarURL={user ? user?.avatarURL : ""}
          userName={user ? user?.userName : "User Name"}
        ></AvatarIcon>
      </div>

      <div className="mt-5">
        <em className="not-italic text-lg font-semibold">Upcoming Events</em>
        <ul className="mt-4">
          <li className="flex items-center">
            <Icon icon={"home"}></Icon>
            <div className="flex flex-col ml-2">
              <em className="not-italic font-semibold">Meeting with Rodrigo</em>
              <span className="text-sm">Wed, 15:00 P.M</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <em className="not-italic text-lg font-semibold">Pending Proposals</em>
        {data.length > 0 ? 
          data.map((row, idx) => (
            <Table key={idx} type="bottom" quantity={1} classname={"mt-3"}>
              <TableItem key={idx} title={row.title} value={row.user} />
            </Table>
          ))
        : <p className="text-sm mt-4">Do not have events</p>}
      </div>

      <div className="mt-10">
        <em className="not-italic text-lg font-semibold">New Proposals</em>
        {data.length > 0 ? 
          data.map((row, idx) => (
            <Table key={idx} type="bottom" quantity={1} classname={"mt-3"}>
              <TableItem key={idx} title={row.title} value={row.user} />
            </Table>
          ))
        : <p className="text-sm mt-4">Do not have events</p>}
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

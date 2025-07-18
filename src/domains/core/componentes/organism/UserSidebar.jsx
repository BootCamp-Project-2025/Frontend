/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { AvatarIcon } from "../molecules/AvatarIcon";
import { EventCard } from "../molecules/EventCard";
import { useState } from "react";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { getRequest } from "../../../../shared/api/getRequest";

export const UserSidebar = ({ user }) => {
  const [data, setData] = useState([
    { title: "Angular", user: "Pepe" },
    { title: "React", user: "Jorge" },
    { title: "DDD", user: "Jose" },
  ]);
  const { showToast } = useToastContext();

  // useEffect(() => {
  //   getRequest(get)
  //     .then((response) => {
  //       if(response.success) {
  //         setData(response.data);
  //       } else {
  //         showToast(response.error.message, "error");
  //       }
  //     })
  //     .catch(err, () => {
  //       showToast(err, "error");
  //     });
  //   }, []);

  return (
    <aside
      className={`bg-white p-6 shadow-md border-l border-black-300 flex flex-col justify-betweenw-64 min-w-64 w-64 h-full`}
      id="userSideBar"
    >
      <div className="min-h-[3rem] h-[3rem] w-[3rem] min-w-[3rem] ml-auto">
        <AvatarIcon
          avatarURL={user ? user?.avatarURL : ""}
          userName={user ? user?.userName : "User Name"}
        ></AvatarIcon>
      </div>

      {/* <div className="mt-5">
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
      </div> */}

      {user && user.isTeacher ? (
        <div className="mt-10">
          <em className="not-italic text-lg font-semibold">
            Pending Proposals
          </em>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <EventCard key={idx} path={``} color="yellow">
                <div
                  className={`border border-gray-100 flex flex-col items-center justify-between p-2 rounded-md w-full bg-[color:var(--color-secondary-50)] text-white hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)] h-22`}
                >
                  <p className="text-gray-500 text-base text-center font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-all">
                    {row.title}
                  </p>
                  <span className="text-gray-800 font-semibold">
                    {row.user}
                  </span>
                </div>
              </EventCard>
            ))
          ) : (
            <p className="text-sm mt-4">Do not have proposals</p>
          )}
        </div>
      ) : null}

      {user && !user.isTeacher ? (
        <div className="mt-10">
          <em className="not-italic text-lg font-semibold">New Proposals</em>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <EventCard key={idx} path={``} color="green">
                <div
                  className={`border border-gray-100 flex flex-col items-center justify-between p-2 rounded-md w-full bg-[color:var(--color-secondary-50)] text-white hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)] h-22`}
                >
                  <p className="text-gray-500 text-base text-center font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-all">
                    {row.title}
                  </p>
                  <span className="text-gray-800 font-semibold">
                    {row.user}
                  </span>
                </div>
              </EventCard>
            ))
          ) : (
            <p className="text-sm mt-4">Do not have proposals</p>
          )}
        </div>
      ) : null}
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

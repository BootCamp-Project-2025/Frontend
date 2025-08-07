import { EventCard } from "../molecules/EventCard";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert } from "../../../../shared/components/molecules/Alert";

export const UserSidebar = ({ data = [] }) => {
  const { user, isAuthenticated } = useAuth();

  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");

  return (
    <aside
      className={`bg-white px-6 shadow-md border-l border-black-300 flex flex-col justify-betweenw-64 min-w-64 w-64 h-full`}
      id="userSideBar"
      style={{ minHeight: "calc(100vh - 5.75rem)" }}
    >
      {user && isAuthenticated && user.isTeacher && isTeacherRoute ? (
        <div>
          <em className="not-italic text-lg font-semibold">
            Pending Proposals
          </em>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <EventCard key={idx} id={row.chatId} color="yellow">
                <div
                  className={`border border-gray-100 flex flex-col items-center justify-between p-2 rounded-md w-full bg-[color:var(--color-secondary-50)] text-white hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)] h-22`}
                >
                  <p className="text-gray-500 text-base text-center font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-all">
                    {row.title}
                  </p>
                  <span className="text-gray-800 font-semibold">
                    {row.value}
                  </span>
                </div>
              </EventCard>
            ))
          ) : (
            <div className="mt-3">
              <Alert
                type="info"
                title="No proposals found"
                description="You don't have any proposals yet."
              />
            </div>
          )}
        </div>
      ) : null}

      {user && isAuthenticated && (!user.isTeacher || !isTeacherRoute) ? (
        <div>
          <em className="not-italic text-lg font-semibold">New Proposals</em>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <EventCard key={idx} id={row.chatId} color="green">
                <div
                  className={`border border-gray-100 flex flex-col items-center justify-between p-2 rounded-md w-full bg-[color:var(--color-secondary-50)] text-white hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)] h-22`}
                >
                  <p className="text-gray-500 text-base text-center font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-all">
                    {row.title}
                  </p>
                  <span className="text-gray-800 font-semibold">
                    {row.value}
                  </span>
                </div>
              </EventCard>
            ))
          ) : (
            <div className="mt-3">
              <Alert
                type="info"
                title="No proposals found"
                description="You don't have any proposals yet."
              />
            </div>
          )}
        </div>
      ) : null}
    </aside>
  );
};

UserSidebar.propTypes = {
  data: PropTypes.array,
};

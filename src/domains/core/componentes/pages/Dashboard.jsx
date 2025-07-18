import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { InfoTabs } from "../organism/InfoTabs";
import { PendingMessages } from "../organism/PendingMessages";
import { UserSidebar } from "../organism/UserSidebar";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "0",
        maxWidth: "100%",
        padding: 0,
      }}
    >
      <div className="w-full px-8 pb-8 xl:px-24 2xl:px-60">
        <div>
          <p className="text-lg font-semibold">
            Hello, {isAuthenticated && user ? user.userName : ""} welcome back!
          </p>
          <em className="text-3xl font-semibold not-italic">Your dashboard</em>
        </div>

        <InfoTabs
          title={
            user && (!user.isTeacher || !isTeacherRoute)
              ? "My Courses"
              : "Courses"
          }
          icon={user && (!user.isTeacher || !isTeacherRoute) ? "search" : "add"}
          path={
            user && (!user.isTeacher || !isTeacherRoute)
              ? "/courses"
              : "/teacher/courses"
          }
          get={""}
        ></InfoTabs>

        <InfoTabs
          title={
            user && (!user.isTeacher || !isTeacherRoute)
              ? "My P2P Courses"
              : "P2P"
          }
          icon={user && (!user.isTeacher || !isTeacherRoute) ? "add" : "search"}
          path={
            user && (!user.isTeacher || !isTeacherRoute)
              ? "/requests"
              : "/courses"
          }
          get={""}
        ></InfoTabs>

        {user && (!user.isTeacher || !isTeacherRoute) ? (
          <InfoTabs
            title={"My requests"}
            icon="add"
            path="/requests"
            get={""}
            tabs={false}
          ></InfoTabs>
        ) : null}

        <PendingMessages></PendingMessages>
      </div>
      <UserSidebar></UserSidebar>
    </main>
  );
};

import { useAuth } from "../../../../shared/hooks/useAuth";
import { InfoTabs } from "../organism/InfoTabs";
import { PendingMessages } from "../organism/PendingMessages";
import { UserSidebar } from "../organism/UserSidebar";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

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
      <div className="w-full p-8">
        <div>
          <p className="text-lg font-semibold">
            Hello, {isAuthenticated && user ? user.userName : ""} welcome back!
          </p>
          <em className="text-3xl font-semibold not-italic">Your dashboard</em>
        </div>

        <InfoTabs
          title={user && !user.isTeacher ? "My Courses" : "Courses"}
          icon={user && !user.isTeacher ? "search" : "add"}
          path={user && !user.isTeacher ? "/courses" : "teacher/courses"}
          get={""}
        ></InfoTabs>

        <InfoTabs
          title={user && !user.isTeacher ? "My P2P Courses" : "P2P"}
          icon={user && !user.isTeacher ? "add" : "search"}
          path={user && !user.isTeacher ? "/requests" : "/courses"}
          get={""}
        ></InfoTabs>

        {user && !user.isTeacher ? (
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
      <UserSidebar user={user}></UserSidebar>
    </main>
  );
};

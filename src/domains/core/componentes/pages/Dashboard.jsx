import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { InfoTabs } from "../organism/InfoTabs";
import { PendingMessages } from "../organism/PendingMessages";
import { UserSidebar } from "../organism/UserSidebar";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../shared/api/getRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith("/teacher/");
  const { showToast } = useToastContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getRequest("/stats");

      if (response.success) {
        console.log("s", response.data.data);
        setData(response.data.data);
      } else {
        showToast(response.error.message, "error");
      }
    };

    getData();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="w-full lg:w-[42rem] xl:w-[55rem] m-auto px-8 pb-8 xl:px-24">
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
          data={[data.courses]}
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
          data={data.p2pCourses}
        ></InfoTabs>

        {user && (!user.isTeacher || !isTeacherRoute) ? (
          <InfoTabs
            title={"My requests"}
            icon="add"
            path="/requests"
            tabs={false}
            data={[data.request]}
          ></InfoTabs>
        ) : null}

        <PendingMessages></PendingMessages>
      </div>
      <UserSidebar data={[]}></UserSidebar>
    </main>
  );
};

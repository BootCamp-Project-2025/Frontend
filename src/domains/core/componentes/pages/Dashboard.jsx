import { Title } from "../../../../shared/components/atoms/Title";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { UserSidebar } from "../organism/UserSidebar";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <main>
      <div>
        <div>
          <p>
            Hello, {isAuthenticated && user ? user.name : "@username"} welcome
            back!
          </p>
          <Title>Your dashboard</Title>
        </div>
        <DashboardContent></DashboardContent>
      </div>
      <UserSidebar user={user}></UserSidebar>
    </main>
  );
};

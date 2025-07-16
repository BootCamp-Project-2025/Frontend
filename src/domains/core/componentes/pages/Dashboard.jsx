import { useAuth } from "../../../../shared/hooks/useAuth";
import { InfoTabs } from "../organism/InfoTabs";
import { UserSidebar } from "../organism/UserSidebar";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  const data = [
    {title: "Courses Created", value: 3},
    {title: "Students", value: 3},
    {title: "Sessions", value: 10},
  ];

  const data2 = [
    {title: "Jobs", value: 3},
    {title: "Students", value: 3},
    {title: "Sessions", value: 10},
  ];

  return (
    <main style={{display: 'flex', justifyContent: 'space-between',margin: '0', maxWidth: '100%', padding: 0}}>
      <div className="w-[100%] p-4">
        <div>
          <p>
            Hello, {isAuthenticated && user ? user.userName : "@username"} welcome
            back!
          </p>
          <em className="text-2xl font-semibold not-italic">Your dashboard</em>
        </div>
        <InfoTabs title={'Courses'} data={data}></InfoTabs>
        <InfoTabs title={'P2P'} data={data2}></InfoTabs>
      </div>
      <UserSidebar user={user}></UserSidebar>
    </main>
  );
};

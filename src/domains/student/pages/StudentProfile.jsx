import { useAuth } from "../../../shared/hooks/useAuth";
import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../../teacher/components/molecules/ProfileInfo";
import About from "../../teacher/components/organisms/About";
import ProfileDetailCard from "../components/organisms/ProfileDetailCard";
import GridPersonalDetail from "../components/molecules/GridPersonalDetail";
import GridAccountDetail from "../components/molecules/GridAccountDetail";

const mockUser = {
  fullName: "Elam Cano",
  about: "About me description",
  userEmail: "elamcano@gmail.com",
  roles: ["Student", "Teacher"],
  createdAt: " 1998",
};

const mockClient = {
  phoneNumber: "+54 3785 495069",
  country: "Argentina",
  city: "Buenos Aires",
  gender: "Masculine",
  dateOfBirth: "June, 1998",
  languagePreference: "English",
};

const StudentProfile = () => {
  const { user } = useAuth();
  console.log(user, "user");
  return (
    <main>
      <ProfileTitle title="Student Profile" />
      {user && <ProfileInfo user={user} />}

      <About />
      <div className="flex flex-wrap gap-4 p-12 md:px-40">
        <ProfileDetailCard title={"Personal details"} isEditable={true}>
          <GridPersonalDetail
            userName={user || "elamjxe"}
            client={mockClient}
          />
        </ProfileDetailCard>
        <ProfileDetailCard title={"Account details"}>
          <GridAccountDetail coursesCompleted={4} user={mockUser} />
        </ProfileDetailCard>
      </div>
    </main>
  );
};

export default StudentProfile;

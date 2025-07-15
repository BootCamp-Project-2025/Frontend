import { useAuth } from "../../../shared/hooks/useAuth";
import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../../teacher/components/molecules/ProfileInfo";
import About from "../../teacher/components/organisms/About";
import ProfileDetailCard from "../components/organisms/ProfileDetailCard";
import GridPersonalDetail from "../components/molecules/GridPersonalDetail";
import GridAccountDetail from "../components/molecules/GridAccountDetail";
import GridSocialLinksDetail from "../components/molecules/GridSocialLinksDetail";
import { useParams } from "react-router-dom";

const mockClient = {
  phoneNumber: "+54 3785 495069",
  country: "Argentina",
  city: "Buenos Aires",
  gender: "Masculine",
  dateOfBirth: "June, 1998",
  languagePreference: "English",
  socialLinks: ["www.youtube.com", "www.Linkedin.com"],
};
const socialLinks = [
  { platform: "linkedin", url: "https://linkedin.com/in/elam" },
  { platform: "instagram", url: "https://instagram.com/elam" },
];
const StudentProfile = () => {
  const { user } = useAuth();
  const { studentId } = useParams();
  console.log(studentId);
  //al hacer get de student deberia recibir el userId

  console.log(user, "user");
  return (
    <main className="flex flex-col gap-16">
      <ProfileTitle title="Student Profile" />
      {user && <ProfileInfo user={user} />}

      <About />
      {user && (
        <div className="flex flex-wrap gap-8 md:p-12 md:px-40">
          {/* Profile Detail */}
          <ProfileDetailCard title={"Personal details"} isEditable={false}>
            <GridPersonalDetail
              userName={user.userName || "User name"}
              client={mockClient}
            />
          </ProfileDetailCard>
          {/* Account Detail */}
          <ProfileDetailCard title={"Account details"} isEditable={false}>
            <GridAccountDetail coursesCompleted={4} user={user} />
          </ProfileDetailCard>
          {/* Social media Detail */}
          <ProfileDetailCard title={"Social links"} isEditable={false}>
            <GridSocialLinksDetail socialLinks={socialLinks} />
          </ProfileDetailCard>
        </div>
      )}
    </main>
  );
};

export default StudentProfile;

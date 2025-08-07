import ProfileInfo from "../components/molecules/ProfileInfo";
import { EducationSection } from "../components/organisms/EducationSection";
import { ExperienceSection } from "../components/organisms/ExperienceSection";
import CertificationSection from "../components/organisms/CertificationSection";
import SkillSection from "../components/organisms/SkillSection";
// import About from "../components/organisms/About";
import { LanguageSection } from "../components/organisms/LanguageSection";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Title } from "../../../shared/components/atoms/Title";

const TeacherProfile = () => {
  const { user, handleUpdateUser } = useAuth();

  return (
    <main className="wrapper flex flex-col gap-16">
      <Title className="border-b-1" color="default">
        Teacher profile
      </Title>
      {user && <ProfileInfo user={user} handleUpdateUser={handleUpdateUser} />}

      {user?.freelancerProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <EducationSection freelancerId={user.freelancerProfile} />
          <ExperienceSection freelancerId={user.freelancerProfile} />
          <CertificationSection freelancerId={user.freelancerProfile} />
          <SkillSection freelancerId={user.freelancerProfile} />
          <LanguageSection freelancerId={user.freelancerProfile} />
        </div>
      )}
    </main>
  );
};

export default TeacherProfile;

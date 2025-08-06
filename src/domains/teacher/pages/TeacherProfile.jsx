import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../components/molecules/ProfileInfo";
import { EducationSection } from "../components/organisms/EducationSection";
import { ExperienceSection } from "../components/organisms/ExperienceSection";
import CertificationSection from "../components/organisms/CertificationSection";
import SkillSection from "../components/organisms/SkillSection";
// import About from "../components/organisms/About";
import { LanguageSection } from "../components/organisms/LanguageSection";
import { useAuth } from "../../../shared/hooks/useAuth";

const TeacherProfile = () => {
  const { user } = useAuth();
  return (
    <main className="wrapper flex flex-col justify-between h-full w-full gap-16 px-8 py-4 mx-auto">
      <ProfileTitle title="Teacher Profile" />
      {user && <ProfileInfo user={user} />}
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

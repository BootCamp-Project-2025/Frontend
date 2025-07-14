import React from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../../teacher/components/molecules/ProfileInfo";
import About from "../../teacher/components/organisms/About";
import ProfileCardDetail from "../components/organisms/ProfileCardDetail";

const StudentProfile = () => {
  const { user } = useAuth();
  return (
    <main>
      <ProfileTitle title="Student Profile" />
      {user && <ProfileInfo user={user} />}

      <About />
      <div>
        <ProfileCardDetail title={"Personal details"} />
      </div>
    </main>
  );
};

export default StudentProfile;

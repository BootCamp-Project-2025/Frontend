import { useEffect, useState } from "react";
import { getRequest } from "../../../shared/api/getRequest";
import { useToastContext } from "../../../shared/contexts/ToastContext";
import { useAuth } from "../../../shared/hooks/useAuth";
import ProfileInfo from "../../teacher/components/molecules/ProfileInfo";
import ProfileDetailCard from "../components/organisms/ProfileDetailCard";
import GridPersonalDetail from "../components/molecules/GridPersonalDetail";
import GridAccountDetail from "../components/molecules/GridAccountDetail";
import GridSocialLinksDetail from "../components/molecules/GridSocialLinksDetail";
import { Title } from "../../../shared/components/atoms/Title";

const StudentProfile = () => {
  const { user, handleUpdateUser } = useAuth();

  const [client, setClient] = useState(null);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchClient = async () => {
      if (!user?.clientProfile) return;
      const res = await getRequest(`clients/${user.clientProfile}`);
      if (res.success) {
        setClient(res.data.data);
      } else {
        showToast("Error loading client profile", "error");
      }
    };
    fetchClient();
  }, [user]);

  return (
    <main className="wrapper flex flex-col gap-16">
      <Title className="border-b-1" color="default">
        Student Profile
      </Title>
      {user && <ProfileInfo user={user} handleUpdateUser={handleUpdateUser} />}

      {client && (
        <div className="flex flex-wrap gap-8 md:p-12 md:px-40">
          <ProfileDetailCard title="Personal details" isEditable={false}>
            <GridPersonalDetail client={client} setClient={setClient} />
          </ProfileDetailCard>

          <ProfileDetailCard title="Account details" isEditable={false}>
            <GridAccountDetail coursesCompleted={4} user={user} />
          </ProfileDetailCard>

          <ProfileDetailCard title="Social links" isEditable={false}>
            <GridSocialLinksDetail client={client} setClient={setClient} />
          </ProfileDetailCard>
        </div>
      )}
    </main>
  );
};

export default StudentProfile;

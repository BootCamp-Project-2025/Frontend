import { useEffect, useState } from "react";
import { getRequest } from "../../../shared/api/getRequest"; // asegurate del path
import { useToastContext } from "../../../shared/contexts/ToastContext"; // si querés mostrar errores
import { useAuth } from "../../../shared/hooks/useAuth";
import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../../teacher/components/molecules/ProfileInfo";
import About from "../../teacher/components/organisms/About";
import ProfileDetailCard from "../components/organisms/ProfileDetailCard";
import GridPersonalDetail from "../components/molecules/GridPersonalDetail";
import GridAccountDetail from "../components/molecules/GridAccountDetail";
import GridSocialLinksDetail from "../components/molecules/GridSocialLinksDetail";

const StudentProfile = () => {
  const { user } = useAuth();
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
    <main className="flex flex-col gap-16">
      <ProfileTitle title="Student Profile" />
      {user && <ProfileInfo user={user} />}
      <About />

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

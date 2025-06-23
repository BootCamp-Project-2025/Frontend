import { Link } from "react-router-dom";
import About from "../../../shared/components/atoms/About";
import ProfileTitle from "../../../shared/components/atoms/ProfileTitle";
import ProfileInfo from "../components/molecules/ProfileInfo";

const TeacherProfile = () => {
  return (
    <main className="flex flex-col justify-between h-full w-full gap-16">
      <ProfileTitle title="Teacher Profile" />
      <ProfileInfo name="Teacher Full Name" email="userEvent.email@gmail.com" />
      <div className="flex:col md:flex gap-24 md:gap-0 justify-around items-center w-full">
        <About
          text={
            "Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially."
          }
        />
        <div className="flex flex-col justify-center gap-4 border-2 border-[color:var(--color-primary-600)] rounded-lg p-4 max-h-min max-w-min">
          <div className="flex items-center gap-16">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl text-[color:var(--color-default-800)] font-bold">
                Courses
              </h3>
              <p className="text-xl text-[color:var(--color-default-500)] font-bold">
                3
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl text-[color:var(--color-default-800)] font-bold">
                Students
              </h3>
              <p className="text-xl text-[color:var(--color-default-500)] font-bold">
                30
              </p>
            </div>
          </div>
          <Link
            to={"/dashboard"}
            className="self-end text-sm text-[color:var(--color-default-400)] hover:text-[color:var(--color-default-800)]"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TeacherProfile;

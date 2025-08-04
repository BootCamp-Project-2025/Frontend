import { Button } from "../atoms/Button";
import Banner from "/banner.jpg";
import { useNavigate } from "react-router-dom";

export const PageBanner = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/courses");
  };

  return (
    <div className="flex flex-col justify-end  min-h-[13rem] sm:min-h-[20rem] bg-gray-300 py-7 relative overflow-hidden wrapper">
      <img
        src={Banner}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-xs"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />
      <div className="flex flex-col items-center w-[90%] m-auto gap-7 z-2">
        <p
          className="text-xl font-[700] text-white text-center"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Empower Your Learning Journey – Discover Expert Freelancers and
          Engaging Courses Tailored for You!
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={handleRedirect}>Discover courses</Button>
        </div>
      </div>
    </div>
  );
};

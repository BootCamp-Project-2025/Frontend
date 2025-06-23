import { Button } from "../atoms/Button";
import { TextInput } from "../molecules/TextInput";

export const PageBanner = () => {
  return (
    <div className="flex flex-col justify-end  min-h-[13rem] sm:min-h-[16.25rem] bg-gray-300  py-7   ">
      <div className="flex flex-col w-[90%] m-auto gap-7 ">
        <p className="text-xl font-[700] text-white">
          Empower Your Learning Journey – Discover Expert Freelancers and
          Engaging Courses Tailored for You!
        </p>
        <div className="flex items-center gap-4">
          <TextInput
            placeholder="Find your next mentor, course, or project.."
            id="bannerTextInput"
          ></TextInput>
          <Button>
            <span
              className="material-symbols-outlined "
              style={{ fontSize: "1.3rem" }}
            >
              search
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { TextInput } from "./TextInput";

export const PageBanner = () => {
  return (
    <div className="flex flex-col justify-end  min-h-[13rem] sm:min-h-[18.25rem] bg-gray-300  py-7   ">
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
            <Icon icon={"search"} className={"w-[1.3rem] h-[1.3rem]"}></Icon>
          </Button>
        </div>
      </div>
    </div>
  );
};

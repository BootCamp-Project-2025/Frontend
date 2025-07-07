import { Button } from "../../../../shared/components/atoms/Button";
import { CourseBannerCategory } from "../atoms/CourseBannerCategory";
import { CourseBannerCreatedBy } from "../atoms/CourseBannerCreatedBy";
import { CourseBannerLanguage } from "../atoms/CourseBannerLanguage";
import { CourseBannerInfo } from "../molecules/CourseBannerInfo";

export const CourseBanner = () => {
  return (
    <div className=" bg-[#2D2D2F] ">
      <div className="flex text-white py-10 gap-15 max-w-[80rem] m-auto items-center justify-between">
        <div className="flex flex-col gap-4.5">
          <CourseBannerCategory></CourseBannerCategory>
          <p className=" font-bold text-3xl line-clamp-2">
            The Ultimate React Course 2025: React, Next.js, Redux & More
          </p>
          <CourseBannerInfo></CourseBannerInfo>
          <CourseBannerCreatedBy
            teacher="Jonas Schmedtmann"
            teacherId={"dsad"}
          ></CourseBannerCreatedBy>
          <CourseBannerLanguage language="English"></CourseBannerLanguage>
        </div>
        <div className="flex flex-col w-[21rem] min-w-[21rem] p-3 gap-3.5 bg-white rounded-xl">
          <div className="flex w-full rounded-lg overflow-hidden">
            <img
              src="/defaultImage3.png"
              alt="course image"
              className="w-full"
            />
          </div>
          <Button className="flex justify-center">Enroll In</Button>
        </div>
      </div>
    </div>
  );
};

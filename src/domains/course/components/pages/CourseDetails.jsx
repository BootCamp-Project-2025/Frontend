import { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { CourseDetailTeacher } from "../molecules/CourseDetailTeacher";
import { CourseModule } from "../molecules/CourseModule";
import { CourseReview } from "../molecules/CourseReview";
import { CourseBanner } from "../organisms/CourseBanner";

export const CourseDetails = () => {
  const [header, setHeader] = useState(null);
  const [modules, setModules] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed (${url})`);
    return res.json();
  };

  const getBannerAndDescription = () =>
    fetchJSON("/courseDetails/banner-description.json");

  const getCourseModules = () => fetchJSON("/courseDetails/modules.json");

  const getCourseTeacher = () => fetchJSON("/courseDetails/teacher.json");

  const getCourseReviews = () => fetchJSON("/courseDetails/reviews.json");

  useEffect(() => {
    getBannerAndDescription().then(setHeader).catch(console.error);
    getCourseModules().then(setModules).catch(console.error);
    getCourseTeacher().then(setTeacher).catch(console.error);
    getCourseReviews().then(setReviews).catch(console.error);
  }, []);

  if (!header) return <p className="text-center py-10">Loading…</p>;

  return (
    <>
      <CourseBanner {...header} />

      <div className="flex flex-col w-[80rem] max-w-[90%] m-auto py-10 gap-9">
        <Title size="lg" color="secondary">
          Description
        </Title>
        <ExpandableText maxLines={4} text={header.description} />

        <Title size="lg" color="secondary">
          Course Content
        </Title>
        <div className="flex flex-col border border-gray-400 border-b-0">
          {modules.map((m) => (
            <CourseModule key={m.titleModule} {...m} />
          ))}
        </div>

        {teacher && (
          <>
            <Title size="lg" color="secondary">
              Instructor
            </Title>
            <CourseDetailTeacher {...teacher} />
          </>
        )}

        <Title size="lg" color="secondary">
          Reviews
        </Title>
        <div className="flex flex-col gap-4">
          {reviews.map((r, idx) => (
            <CourseReview key={idx} {...r} />
          ))}
          <div className="flex justify-end">
            <Button variant="ghost" className="flex items-center font-bold">
              Show more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

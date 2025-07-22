import { use, useEffect, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { CourseDetailsTeacher } from "../molecules/CourseDetailsTeacher";
import { CourseDetailsModule } from "../molecules/CourseDetailsModule";
import { CourseDetailsReview } from "../molecules/CourseDetailsReview";
import { CourseHeroSection } from "../organisms/CourseHeroSection";
import { UseGet } from "../../api/UseGet";
import { useNavigate, useParams } from "react-router-dom";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const CourseDetails = () => {
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { id } = useParams();

  const { responseData, loading, error } = UseGet("courses", id);

  const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed (${url})`);
    return res.json();
  };

  const getCourseTeacher = () => fetchJSON("/courseDetails/teacher.json");

  const getCourseReviews = () => fetchJSON("/courseDetails/reviews.json");

  useEffect(() => {
    getCourseTeacher().then(setTeacher).catch(console.error);
    getCourseReviews().then(setReviews).catch(console.error);
  }, []);

  if (loading) return <p className="text-center py-10">Loading…</p>;

  if (error) {
    showToast("Failed to load course details", "error");
    navigate("/courses");
  }

  function getMoreReview() {
    console.log("getting more reviews");
  }

  return (
    <>
      <CourseHeroSection {...responseData} />

      <div className="flex flex-col w-[80rem] max-w-[90%] m-auto py-10 gap-9">
        <Title size="lg" color="secondary">
          Description
        </Title>
        <ExpandableText maxLines={4} text={responseData.description} />

        <Title size="lg" color="secondary">
          Course Content
        </Title>

        <CourseDetailsModule />

        <Title size="lg" color="secondary" id="teacherSection">
          Teacher
        </Title>
        <CourseDetailsTeacher {...teacher} />

        <Title size="lg" color="secondary" id="reviewsSection">
          Reviews
        </Title>
        <div className="flex flex-col gap-4">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review, index) => (
                <CourseDetailsReview key={index} {...review} />
              ))}
              <Button
                variant="bordered"
                className="flex justify-center font-bold"
                onClick={getMoreReview}
              >
                Show more reviews
              </Button>
            </>
          ) : (
            <p className="text-gray-500 italic text-center border border-gray-300 py-7 px-2 rounded-lg">
              There are no reviews for this course yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

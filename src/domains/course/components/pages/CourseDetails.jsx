/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import { getRequest } from "../../../../shared/api/getRequest";

export const CourseDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [teacher, setTeacher] = useState(null);

  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { idCourse } = useParams();

  const { responseData, loading, error } = UseGet("courses", idCourse);
  const {
    responseData: responseDataModule,
    loading: loadingModule,
    error: errorModule,
  } = UseGet("courses", idCourse + "/modules");

  const getTeacher = async () => {
    if (!responseData || !responseData.data?.userId) {
      setTeacher(null);
      return;
    }

    const response = await getRequest(`/users/${responseData.data?.userId}`);

    if (!response.success) {
      setTeacher(null);
    } else {
      setTeacher(response.data);
    }
  };

  const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed (${url})`);
    return res.json();
  };

  const getCourseReviews = () => fetchJSON("/courseDetails/reviews.json");

  useEffect(() => {
    getTeacher();
    getCourseReviews().then(setReviews).catch(console.error);
  }, [responseData]);

  useEffect(() => {
    if (error || errorModule) {
      showToast("Failed to load course details", "error");
      navigate("/courses");
    }
  }, [error, errorModule]);

  if (loading || loadingModule)
    return <p className="text-center py-10">Loading…</p>;

  function getMoreReview() {
    console.log("getting more reviews");
  }

  return responseData ? (
    <>
      <CourseHeroSection {...responseData.data} userName={teacher?.userName} />

      <div className="flex flex-col w-[80rem] max-w-[90%] m-auto py-10 gap-9">
        <Title size="lg" color="secondary">
          Description
        </Title>
        <ExpandableText maxLines={4} text={responseData.data.description} />

        <Title size="lg" color="secondary">
          Course Content
        </Title>

        <div className="flex flex-col border border-gray-400 border-b-0">
          {responseDataModule.data.map((m, idx) => (
            <CourseDetailsModule key={idx} {...m} />
          ))}
        </div>

        <Title size="lg" color="secondary" id="teacherSection">
          Teacher
        </Title>

        {teacher && <CourseDetailsTeacher {...teacher} />}

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
  ) : null;
};

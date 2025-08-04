import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { CourseDetailsTeacher } from "../molecules/CourseDetailsTeacher";
import { CourseDetailsModule } from "../molecules/CourseDetailsModule";
import { CourseDetailsReview } from "../molecules/CourseDetailsReview";
import { CourseHeroSection } from "../organisms/CourseHeroSection";
import { UseGet } from "../../api/UseGet";
import { useCheckEnrollment } from "../../customHooks/useCheckEnrollment";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { getRequest } from "../../../../shared/api/getRequest";
import { baseAPI } from "../../../../shared/api/axios/AxiosConnection";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";

export const CourseDetails = () => {
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const { showToast } = useToastContext();
  const { idCourse } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    isEnrolled,
    loading: loadingIsEnrolled,
    setIsEnrolled,
  } = useCheckEnrollment(idCourse);

  const { responseData: courseData, loading: loadingCourse } = UseGet(
    "courses",
    idCourse
  );

  const {
    responseData: moduleData,
    loading: loadingModules,
    error: moduleError,
  } = UseGet("courses", `${idCourse}/modules`);

  const fetchTeacher = async () => {
    try {
      if (courseData?.data?.userId) {
        const response = await getRequest(`/users/${courseData.data.userId}`);
        if (response.success) {
          setTeacher(response.data);
        } else {
          throw new Error("Failed to load teacher");
        }
      }
    } catch (err) {
      console.error(err);
      setTeacher(null);
      showToast("Error loading teacher info", "error");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch("/courseDetails/reviews.json");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      showToast("Error loading course reviews", "error");
    }
  };

  const handleEnroll = async () => {
    if (!user?.id) {
      showToast("You need to sign in to enroll in a course", "error");
      return;
    }

    if (loadingIsEnrolled || loadingEnroll) return;

    if (isEnrolled) {
      navigate("./content");
      return;
    }

    setLoadingEnroll(true);
    try {
      await baseAPI.post("/enrollments", {
        userId: user.id,
        courseId: idCourse,
      });

      setIsEnrolled(true);
      showToast("Enrollment successful", "success");
    } catch (err) {
      console.error(err);
      showToast("Enrollment failed. Please try again later.", "error");
    } finally {
      setLoadingEnroll(false);
    }
  };

  useEffect(() => {
    if (courseData) {
      fetchTeacher();
      fetchReviews();
    }
  }, [courseData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loadingCourse || loadingModules) {
    return <Loading text="Loading Course Details" className="my-8" />;
  }

  const course = courseData?.data;
  const modules = moduleData?.data || [];

  if (!course) {
    return (
      <div className="flex m-8">
        <Alert
          type="error"
          title="Course Not Found"
          description="The course you are trying to access does not exist."
        />
      </div>
    );
  }

  return (
    <>
      <CourseHeroSection
        {...course}
        userName={teacher?.userName}
        loadingIsEnrolled={loadingIsEnrolled}
        loadingEnrollIn={loadingEnroll}
        isEnrolled={isEnrolled}
        handleEnroll={handleEnroll}
      />

      <div className="flex flex-col w-[80rem] max-w-[90%] m-auto py-10 gap-9">
        <Title size="lg" color="secondary">
          Description
        </Title>
        <ExpandableText maxLines={4} text={course?.description || ""} />

        <Title size="lg" color="secondary">
          Course Content
        </Title>

        {moduleError && (
          <Alert
            type="warn"
            title="Modules not available"
            description="There was a problem loading the course content. Please try again later."
          />
        )}

        {!moduleError && modules.length > 0 && (
          <div className="flex flex-col border border-gray-400 border-b-0">
            {modules.map((mod, idx) => (
              <CourseDetailsModule key={idx} {...mod} />
            ))}
          </div>
        )}

        {!moduleError && modules.length == 0 && (
          <p className="text-gray-500 italic text-center border border-gray-300 py-7 px-2 rounded-lg">
            There are no modules created for this course yet. Please check back
            later.
          </p>
        )}

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
              {reviews.map((review, idx) => (
                <CourseDetailsReview key={idx} {...review} />
              ))}
              <Button
                variant="bordered"
                className="flex justify-center font-bold"
                onClick={() => console.log("Load more reviews")}
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

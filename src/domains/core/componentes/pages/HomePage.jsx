import { useEffect, useState } from "react";
import { PageBanner } from "../../../../shared/components/molecules/PageBanner";
import { Title } from "../../../../shared/components/atoms/Title";
import { TeacherCardList } from "../organism/TeacherCardList";
import { CategoryCardsList } from "../organism/CategoryCardsList";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { getRequest } from "../../../../shared/api/getRequest";
import { CourseCard } from "../../../../shared/components/molecules/CourseCard";

export const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const { showToast } = useToastContext();

  useEffect(() => {
    const getData = async () => {
      const response = await getRequest("/courses");

      if (response.success) {
        setCourses(response.data.data);
      } else {
        showToast(response.error.message, "error");
      }
    };

    getData();
  }, []);

  return (
    <>
      <PageBanner />
      <main className="max-w-[90rem] px-8 py-4 mx-auto">
        <div className="flex flex-col gap-12">
          <Title className="text-gray-900" size="lg">
            Categories
          </Title>
          <CategoryCardsList />

          <Title className="text-gray-900" size="lg">
            Popular Courses
          </Title>
          {courses?.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
              {courses.map((course, idx) => (
                <CourseCard
                  key={course.id ? course.id : idx}
                  author={course.author}
                  description={course.description}
                  imageURL={course.imgSrc}
                  name={course.name}
                  rating={course.rating}
                />
              ))}
            </div>
          ) : (
            <p>Courses not found</p>
          )}

          <Title className="text-gray-900" size="lg">
            Most Rated Teachers
          </Title>
          <TeacherCardList />
        </div>
      </main>
    </>
  );
};

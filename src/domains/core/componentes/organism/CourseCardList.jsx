import { useState } from "react";
import { useEffect } from "react";
import { CourseCard } from "../../../../shared/components/molecules/CourseCard";

export const CourseCardList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/requestPopularCourses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
      {courses.map((course) => {
        return (
          <CourseCard
            key={course.id}
            author={course.author}
            description={course.description}
            imageURL={course.imageURL}
            name={course.name}
            rating={course.rating}
          ></CourseCard>
        );
      })}
    </div>
  );
};

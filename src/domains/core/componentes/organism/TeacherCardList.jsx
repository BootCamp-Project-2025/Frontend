import { useEffect, useState } from "react";
import { Slider } from "../../../../shared/components/atoms/Slider";
import { TeacherCard } from "../../../../shared/components/molecules/TeacherCard";
export const TeacherCardList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/requestPopularTeachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  return (
    <Slider>
      {teachers.map((teacher) => {
        return (
          <TeacherCard
            key={teacher.id}
            id={teacher.id}
            imageURL={teacher.imageURL}
            name={teacher.name}
            description={teacher.description}
            rating={teacher.rating}
            skills={teacher.skills}
            className="min-w-[15rem] sm:min-w-[25rem]"
          ></TeacherCard>
        );
      })}
    </Slider>
  );
};

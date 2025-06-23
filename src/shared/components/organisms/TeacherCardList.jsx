import { useEffect, useState } from "react";
import { TeacherCard } from "../molecules/teacherCard";

export const TeacherCardList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/requestPopularTeachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error loading  data:", err));
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-x-4 gap-y-4">
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
          ></TeacherCard>
        );
      })}
    </div>
  );
};

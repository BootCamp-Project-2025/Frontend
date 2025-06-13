import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import { ExperienceSection } from "./domains/Teacher/components/organisms/ExperienceSection";
import { EducationSection } from "./domains/teacher/components/organisms/EducationSection";
import AboutMeSection from "./domains/teacher/components/templates/AboutMeSection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about-me" element={<AboutMeSection />} />
        <Route path="courses" element={<CourseCardList />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route
          path="/teacherProfile"
          element={
            <>
              <EducationSection />
              <ExperienceSection />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

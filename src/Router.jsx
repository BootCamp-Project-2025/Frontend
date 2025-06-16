import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import { ExperienceSection } from "./domains/teacher/components/organisms/ExperienceSection";
import { EducationSection } from "./domains/teacher/components/organisms/EducationSection";
import AboutMeSection from "./domains/teacher/components/templates/AboutMeSection";
import CertificationsList from "./domains/teacher/components/organisms/CertificationList.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about-me" element={<AboutMeSection />} />
        <Route path="courses" element={<CourseCardList />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/certifications" element={<CertificationsList />} />
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

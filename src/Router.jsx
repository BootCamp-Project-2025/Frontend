import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import TeacherSkills from "./domains/teacher/components/organisms/TeacherSkills";
import { ExperienceSection } from "./domains/teacher/components/organisms/ExperienceSection";
import { EducationSection } from "./domains/teacher/components/organisms/EducationSection";
import { LanguageSection } from "./domains/teacher/components/organisms/LanguageSection";
import AboutMeSection from "./domains/teacher/components/organisms/AboutMeSection";
import CertificationsList from "./domains/teacher/components/organisms/CertificationSection.jsx";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="courses" element={<CourseCardList />} />
        <Route path="health-check" element={<HealthCheck />} />
        <Route path="course-select" element={<CourseTypeSelection />} />
        <Route
          path="teacher-profile"
          element={
            <div className="px-8 flex flex-col gap-4">
              <AboutMeSection />
              <EducationSection />
              <LanguageSection />
              <ExperienceSection />
              <CertificationsList />
              <TeacherSkills />
            </div>
          }
        />

        <Route path="button-gallery" element={<ButtonGallery />} />
        <Route path="dropdown-gallery" element={<DropdownSelectGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import TeacherSkills from "./domains/teacher/components/organisms/TeacherSkills";
import { ExperienceSection } from "./domains/teacher/components/organisms/ExperienceSection";
import { EducationSection } from "./domains/teacher/components/organisms/EducationSection";
import AboutMeSection from "./domains/teacher/components/organisms/AboutMeSection";
import CertificationsList from "./domains/teacher/components/organisms/CertificationSection.jsx";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import { HomePage } from "./domains/core/componentes/pages/HomePage.jsx";
import { Header } from "./domains/core/componentes/molecules/Header.jsx";
import { Footer } from "./domains/core/componentes/molecules/Footer.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="courses"
          element={
            <main>
              <CourseCardList />
            </main>
          }
        />
        <Route path="health-check" element={<HealthCheck />} />
        <Route path="course-select" element={<CourseTypeSelection />} />
        <Route
          path="teacher-profile"
          element={
            <main>
              <div className="px-8 flex flex-col gap-4">
                <AboutMeSection />
                <EducationSection />
                <ExperienceSection />
                <CertificationsList />
                <TeacherSkills />
              </div>
            </main>
          }
        />
        <Route path="button-gallery" element={<ButtonGallery />} />

        <Route path="dropdown-gallery" element={<DropdownSelectGallery />} />
        <Route
          path="*"
          element={
            <main>
              <h1>Page not Found</h1>
            </main>
          }
        />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

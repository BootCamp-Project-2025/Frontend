import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import TeacherSkills from "./domains/teacher/organisms/TeacherSkills";
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
          path="/teacher-skills"
          element={<TeacherSkills className="w-1/3" style={{ Width: "30%" }} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import TeacherProfile from "./domains/teacher/pages/TeacherProfile.jsx";
import Layout from "./shared/Layout.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="courses" element={<CourseCardList />} />
          <Route path="health-check" element={<HealthCheck />} />
          <Route path="course-select" element={<CourseTypeSelection />} />
          <Route path="teacher/profile" element={<TeacherProfile />} />

          <Route path="button-gallery" element={<ButtonGallery />} />
          <Route path="dropdown-gallery" element={<DropdownSelectGallery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

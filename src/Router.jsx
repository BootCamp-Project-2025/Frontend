import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import TextEditorShowcase from "./shared/components/templates/TextEditorShowcase.jsx";
import { HomePage } from "./domains/core/componentes/pages/HomePage.jsx";
import { Footer } from "./domains/core/componentes/molecules/Footer.jsx";
import { Header } from "./domains/core/componentes/organism/Header.jsx";
import TeacherProfile from "./domains/teacher/pages/TeacherProfile.jsx";
import CardShowcase from "./shared/components/templates/CardShowcase.jsx";
import TitleShowcase from "./shared/components/templates/TitleShowcase.jsx";
import CourseSyllabus from "./domains/course/components/organisms/CourseSyllabus.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/courses"
          element={
            <main>
              <p>courses section</p>
            </main>
          }
        />
        <Route
          path="/teachers"
          element={
            <main>
              <p>teachers section</p>
            </main>
          }
        />

        <Route
          path="/teacher/courses"
          element={
            <main>
              <CourseCardList />
            </main>
          }
        />

        <Route
          path="/teacher/profile"
          element={
            <main>
              <TeacherProfile />
            </main>
          }
        />
        <Route path="health-check" element={<HealthCheck />} />
        <Route path="course-select" element={<CourseTypeSelection />} />
        <Route path="teacher-profile" element={<TeacherProfile />} />
        <Route path="button-gallery" element={<ButtonGallery />} />
        <Route path="dropdown-gallery" element={<DropdownSelectGallery />} />
        <Route path="course-syllabus" element={<CourseSyllabus />} />
        <Route path="texteditor-showcase" element={<TextEditorShowcase />} />

        <Route
          path="*"
          element={
            <main>
              <h1>Page not Found</h1>
            </main>
          }
        />
        <Route path="card-showcase" element={<CardShowcase />} />
        <Route path="title-showcase" element={<TitleShowcase />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

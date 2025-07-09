import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import FileUploadExample from "./shared/components/templates/FileUploadExample.jsx";
import TextEditorShowcase from "./shared/components/templates/TextEditorShowcase.jsx";
import { Dashboard } from "./shared/components/templates/Dashboard.jsx";
import { HomePage } from "./domains/core/componentes/pages/HomePage.jsx";
import TeacherProfile from "./domains/teacher/pages/TeacherProfile.jsx";
import CardShowcase from "./shared/components/templates/CardShowcase.jsx";
import TitleShowcase from "./shared/components/templates/TitleShowcase.jsx";
import DocComponent from "./shared/components/atoms/DocComponent.jsx";
import App from "./App.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<main>Teacher dashboard</main>} />
          <Route path="/dashboard/profile" element={<main>Profile</main>} />
          <Route
            path="/dashboard/teacher"
            element={<main>Teacher profile</main>}
          />
          <Route path="/dashboard/courses" element={<main>Course list</main>} />
          <Route
            path="/dashboard/courses/homePage"
            element={<main>Creta home page</main>}
          />
          <Route
            path="/dashboard/courses/:courseId/homePage"
            element={<main>Edit home page</main>}
          />
          <Route
            path="/dashboard/courses/syllabus"
            element={<main>Create syllabus page</main>}
          />
          <Route
            path="/dashboard/courses/:courseId/syllabus"
            element={<main>Edit syllabus page</main>}
          />
          <Route path="/dashboard/chats" element={<main>Chats</main>} />
        </Route>

        <Route element={<App />}>
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
          <Route path="file-upload" element={<FileUploadExample />} />
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
          <Route path="doc-component" element={<DocComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import StaticCourseHomePageForm from "./domains/course/components/organisms/StaticCourseHomePageForm.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import FileUploadExample from "./shared/components/templates/FileUploadExample.jsx";
import TextEditorShowcase from "./shared/components/templates/TextEditorShowcase.jsx";
import { Dashboard } from "./shared/components/templates/Dashboard.jsx";
import { HomePage } from "./domains/core/componentes/pages/HomePage.jsx";
import TeacherProfile from "./domains/teacher/pages/TeacherProfile.jsx";
import CardShowcase from "./shared/components/templates/CardShowcase.jsx";
import TitleShowcase from "./shared/components/templates/TitleShowcase.jsx";
import { CourseDetails } from "./domains/course/components/pages/CourseDetails.jsx";
import DocComponent from "./shared/components/atoms/DocComponent.jsx";
import App from "./App.jsx";
import { Title } from "./shared/components/atoms/Title.jsx";
import { CoursesPage } from "./domains/core/componentes/pages/CoursesPage.jsx";
import { SearchRequestPage } from "./domains/teacher/pages/SearchRequestPage.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="teacher" element={<Dashboard />}>
          <Route
            path="/teacher/request-search"
            element={<SearchRequestPage />}
          />
          <Route
            path="/teacher/dashboard"
            element={
              <main>
                <Title size="xxl" color="default">
                  Teacher Dashboard
                </Title>
              </main>
            }
          />
          <Route path="/teacher/profile" element={<TeacherProfile />} />

          <Route path="/teacher/courses" element={<CourseCardList />} />

          <Route
            path="/teacher/courses/homePage"
            element={<main>Creta home page</main>}
          />
          <Route
            path="/teacher/courses/:courseId/homePage"
            element={<StaticCourseHomePageForm />}
          />
          <Route
            path="/teacher/courses/syllabus"
            element={<main>Create syllabus page</main>}
          />
          <Route
            path="/teacher/courses/:courseId/syllabus"
            element={<main>Edit syllabus page</main>}
          />
          <Route
            path="/teacher/chats"
            element={
              <main>
                <Title size="xxl" color="default">
                  Chats
                </Title>
              </main>
            }
          />
        </Route>

        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route
            path="/courses"
            element={
              <main>
                <p>Courses Section</p>
              </main>
            }
          />
          <Route path="/courses/:idCourse" element={<CourseDetails />} />

          <Route
            path="/teachers"
            element={
              <main>
                <p>Teachers Section</p>
              </main>
            }
          />
          <Route
            path="/teachers/:idTeacher"
            element={
              <main>
                <p>Teacher Details</p>
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
            path="/dashboard/teacher/profile"
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseCardList from "./domains/course/components/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";
import ButtonGallery from "./shared/components/templates/ButtonGallery.jsx";
import CourseTypeSelection from "./domains/teacher/components/molecules/CourseTypeSelection.jsx";
import StaticCourseHomePageForm from "./domains/course/components/organisms/StaticCourseHomePageForm.jsx";
import DropdownSelectGallery from "./shared/components/templates/DropdownSelectGallery.jsx";
import FileUploadExample from "./shared/components/templates/FileUploadExample.jsx";
import TextEditorShowcase from "./shared/components/templates/TextEditorShowcase.jsx";
import { HomePage } from "./domains/core/componentes/pages/HomePage.jsx";
import TeacherProfile from "./domains/teacher/pages/TeacherProfile.jsx";
import CardShowcase from "./shared/components/templates/CardShowcase.jsx";
import TitleShowcase from "./shared/components/templates/TitleShowcase.jsx";
import CourseSyllabus from "./domains/course/components/organisms/CourseSyllabus.jsx";
import { CourseDetails } from "./domains/course/components/pages/CourseDetails.jsx";
import DocComponent from "./shared/components/atoms/DocComponent.jsx";
import { MainLayout } from "./layouts/MainLayout.jsx";
import { Dashboard } from "./domains/core/componentes/pages/Dashboard.jsx";
import { TeacherLayout } from "./layouts/TeacherLayout.jsx";
import { StudentLayout } from "./layouts/StudentLayout.jsx";
import { CoursesPage } from "./domains/core/componentes/pages/CoursesPage.jsx";
import StudentRequests from "./domains/core/componentes/organism/StudentRequests.jsx";
import { ChatShowcase } from "./shared/components/templates/ChatShowcase.jsx";
import { ChatPage } from "./domains/chat/components/pages/ChatPage.jsx";
import StudentProfile from "./domains/student/pages/StudentProfile.jsx";
import { SearchRequestPage } from "./domains/teacher/pages/SearchRequestPage.jsx";
import { MyCoursesListStudent } from "./domains/course/components/pages/MyCoursesListStudent.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:idCourse" element={<CourseDetails />} />
          <Route path="/teachers" element={<p>Teachers Section</p>} />
          <Route path="/teachers/:idTeacher" element={<p>Teacher Details</p>} />

          <Route path="health-check" element={<HealthCheck />} />
          <Route path="course-select" element={<CourseTypeSelection />} />
          <Route path="button-gallery" element={<ButtonGallery />} />
          <Route path="dropdown-gallery" element={<DropdownSelectGallery />} />
          <Route path="file-upload" element={<FileUploadExample />} />
          <Route path="texteditor-showcase" element={<TextEditorShowcase />} />
          <Route path="card-showcase" element={<CardShowcase />} />
          <Route path="title-showcase" element={<TitleShowcase />} />
          <Route path="doc-component" element={<DocComponent />} />
        </Route>

        <Route path="teacher" element={<TeacherLayout />}>
          <Route
            path="/teacher/search-requests"
            element={<SearchRequestPage />}
          />
          <Route path="/teacher/dashboard" element={<Dashboard />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />

          <Route path="/teacher/courses" element={<CourseCardList />} />

          <Route
            path="/teacher/courses/homePage"
            element={<h1>Creta home page</h1>}
          />
          <Route
            path="/teacher/courses/:courseId/homePage"
            element={<StaticCourseHomePageForm />}
          />
          <Route
            path="/teacher/courses/syllabus"
            element={<h1>Create syllabus page</h1>}
          />
          <Route
            path="/teacher/courses/:courseId/syllabus"
            element={<CourseSyllabus />}
          />
          <Route path="/teacher/chats">
            <Route index element={<ChatPage />} />
          </Route>
          <Route
            path="/teacher/search-requests"
            element={<h1>Search Resquest</h1>}
          />
        </Route>

        <Route path="student" element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/courses" element={<MyCoursesListStudent />} />
          <Route path="/student/my-requests" element={<StudentRequests />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="card-showcase" element={<CardShowcase />} />
          <Route path="title-showcase" element={<TitleShowcase />} />
          <Route path="doc-component" element={<DocComponent />} />
          <Route path="chat-showcase" element={<ChatShowcase />} />
        </Route>

        <Route
          path="/dashboard/teacher/profile"
          element={
            <main>
              <TeacherProfile />
            </main>
          }
        />
        <Route
          path="/student/requests"
          element={
            <main>
              <StudentRequests />
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
      </Routes>
    </BrowserRouter>
  );
}

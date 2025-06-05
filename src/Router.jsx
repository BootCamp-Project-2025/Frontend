import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/Course/organisms/CourseCardList.jsx";
import HealthCheck from "./domains/core/HealthCheck";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route default path="/" element={<App />} />
        <Route path="courses" element={<CourseCardList />} />
        <Route path="/health-check" element={<HealthCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

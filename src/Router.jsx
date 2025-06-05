import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CourseCardList from "./domains/Course/organisms/CourseCardList.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route default path="/" element={<App />} />
        <Route path="courses" element={<CourseCardList />} />
      </Routes>
    </BrowserRouter>
  );
}

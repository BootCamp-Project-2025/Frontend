import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HealthCheck from "./domains/core/HealthCheck";
import TeacherSkills from "./domains/Learning/organisms/TeacherSkills";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route
          path="/teacher-skills"
          element={<TeacherSkills className="w-1/3" style={{ Width: "30%" }} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

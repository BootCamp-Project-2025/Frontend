import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HealthCheck from "./domains/core/HealthCheck";
import { ExperienceSection } from "./domains/Teacher/components/organisms/ExperienceSection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/teacherProfile" element={<ExperienceSection />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ExperienceSection } from "./shared/components/organisms/ExperienceSection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/teacherProfile"
          element={<ExperienceSection></ExperienceSection>}
        />
      </Routes>
    </BrowserRouter>
  );
}

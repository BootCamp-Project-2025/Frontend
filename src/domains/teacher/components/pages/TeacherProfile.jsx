import React from "react";
import AboutMeSection from "../organisms/AboutMeSection";
import { EducationSection } from "../organisms/EducationSection";
import { ExperienceSection } from "../organisms/ExperienceSection";
import TeacherSkills from "../organisms/TeacherSkills";
import CertificationSection from "../organisms/CertificationSection";

export const TeacherProfile = () => {
  return (
    <main>
      <div className="px-8 flex flex-col gap-4">
        <AboutMeSection />
        <EducationSection />
        <ExperienceSection />
        <CertificationSection />
        <TeacherSkills />
      </div>
    </main>
  );
};

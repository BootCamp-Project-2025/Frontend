import SectionTitle from "../atoms/SectionTitle";
import AboutMeForm from "../organisms/AboutMeForm";
import "./templates.css";

export default function AboutMeCard() {
  return (
    <div className="about-me-card flex flex-col justify-stretch gap-2.5 p-2">
      <div className="self-center">
        <SectionTitle text="About me Form" />
      </div>
      <div className="h-full">
        <AboutMeForm />
      </div>
    </div>
  );
}

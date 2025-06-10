import AboutMeSectionText from "../atoms/AboutMeSectionContent";
import SectionTitle from "../atoms/SectionTitle";
import { Button } from "../../../../shared/components/atoms/Button";
import usePopup from "../../../../shared/hooks/usePopup";
import AboutMeCard from "./AboutMeCard";

export default function AboutMeSection() {
  const { openPopup, closePopup } = usePopup();

  const handlePopup = () => {
    openPopup(AboutMeCard, { title: "popup form" }, true);
  };

  return (
    <div className="flex flex-col border-blue-500 rounded-2xl w-full border-2 px-8 py-7 gap-4">
      <div>
        <SectionTitle text={"About me"} />
      </div>
      <div>
        <AboutMeSectionText />
      </div>
      <div>
        <Button onClick={handlePopup} styleType="addBtn">
          Button
        </Button>
      </div>
    </div>
  );
}

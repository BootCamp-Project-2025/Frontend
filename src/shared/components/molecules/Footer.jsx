import { Accordion } from "../atoms/Accordion";
import LTCrowgLogo from "../../../assets/LTCrowdLogo.svg";
import { ItemFooter } from "../atoms/ItemFooter";

export const Footer = () => {
  return (
    <footer className="py-10  border-t border-gray-200">
      <div className="flex flex-col gap-7 w-[90%] m-auto">
        <div className="flex ">
          <img src={LTCrowgLogo} alt="Logo LTCrowd" className="h-[1.2rem] " />
        </div>

        <div className="flex flex-col md:flex-row md:gap-5">
          <Accordion title="Categories">
            <div className="flex flex-col gap-3">
              <ItemFooter>Technology</ItemFooter>
              <ItemFooter>Science</ItemFooter>
              <ItemFooter>Art</ItemFooter>
              <ItemFooter>Fitness</ItemFooter>
              <ItemFooter>Music</ItemFooter>
            </div>
          </Accordion>
          <Accordion title="Resources">
            <div className="flex flex-col gap-3">
              <ItemFooter>How LTCrowd Works</ItemFooter>
              <ItemFooter>LTCrowd Guides</ItemFooter>
              <ItemFooter>Reviews</ItemFooter>
            </div>
          </Accordion>
          <Accordion title="Students">
            <div className="flex flex-col gap-3">
              <ItemFooter>Find a Course</ItemFooter>
              <ItemFooter>Search Teacher</ItemFooter>
            </div>
          </Accordion>
          <Accordion title="Teacher">
            <div className="flex flex-col gap-3">
              <ItemFooter>Become a LTCrowd teacher</ItemFooter>
              <ItemFooter>Publish your course</ItemFooter>
              <ItemFooter>Search for job</ItemFooter>
              <ItemFooter>Teacher Equity</ItemFooter>
            </div>
          </Accordion>
          <Accordion title="Company">
            <div className="flex flex-col gap-3">
              <ItemFooter>About Us</ItemFooter>
              <ItemFooter>Help & Support</ItemFooter>
              <ItemFooter>Contact Us</ItemFooter>
              <ItemFooter>Terms of service</ItemFooter>
            </div>
          </Accordion>
        </div>
        <div className="py-3 border-t border-primary-500">
          <p className="text-xs">© LTCrowd - 2025 All rights deserved</p>
        </div>
      </div>
    </footer>
  );
};

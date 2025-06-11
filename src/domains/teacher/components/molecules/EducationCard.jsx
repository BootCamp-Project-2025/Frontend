import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";

export const EducationCard = ({
  id,
  university,
  career,
  startDate,
  endDate,
  editCard,
}) => {
  return (
    <div className=" bg-[#D7E6FD] p-4 rounded-lg" data-testid="experience-card">
      <div className="flex flex-row gap-2.5">
        <div className="w- min-w-6 ">
          <svg
            className="fill-gray-800 w-full"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row flex-wrap text-md font-semibold text-gray-800 gap-1.5 justify-between  items-center">
            <p className="text-nowrap text-xl">{university}</p>
          </div>
          <p className="text-gray-500 text-lg">{career}</p>
          <p className="text-gray-500 text-base">
            {startDate}, {endDate}
          </p>
        </div>
        <div>
          <Button
            styleType="editBtn"
            classname="editButton"
            onClick={() => {
              editCard(id);
            }}
          >
            <svg viewBox="0 -960 960 960" className="w-20 h-20 fill-white">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

EducationCard.propTypes = {
  id: PropTypes.string,
  university: PropTypes.string,
  career: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  editCard: PropTypes.func,
};

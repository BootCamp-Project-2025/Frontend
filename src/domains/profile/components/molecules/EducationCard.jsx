import PropTypes from "prop-types";
import { ButtonProfileEditCard } from "../atoms/ButtonProfileEditCard";

export const EducationCard = ({
  id,
  university,
  career,
  startDate,
  endDate,
  editCard,
}) => {
  return (
    <div className="bg-[#D7E6FD] p-4 rounded-lg">
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
            <p className="text-nowrap">{university} </p>
          </div>
          <p className="text-sm text-gray-500">{career}</p>
          <p className="text-sm text-gray-500 line-clamp-3">
            {" "}
            {startDate}, {endDate}
          </p>
        </div>
        <div>
          <ButtonProfileEditCard
            onClick={() => {
              editCard(id);
            }}
          ></ButtonProfileEditCard>
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

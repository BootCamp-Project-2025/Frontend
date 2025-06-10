import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";

export const ExperienceCard = ({
  id,
  jobPosition,
  employer,
  country,
  startDate,
  endDate,
  description,
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
            <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row flex-wrap text-md font-semibold text-gray-800 gap-1.5 justify-between  items-center">
            <p className="text-nowrap text-xl">{jobPosition} </p>
            <p className="text-nowrap text-base">
              {startDate} - {endDate}
            </p>
          </div>
          <p className="text-lg text-gray-500">
            {employer}, {country}
          </p>
          <p className="text-lg text-gray-500 line-clamp-3">{description}</p>
        </div>
        <div>
          <Button
            styleType="editBtn"
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

ExperienceCard.propTypes = {
  id: PropTypes.string,
  jobPosition: PropTypes.string,
  employer: PropTypes.string,
  country: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  description: PropTypes.string,
  editCard: PropTypes.func,
};

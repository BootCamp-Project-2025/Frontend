import PropTypes from "prop-types";
import { ButtonProfileEditCard } from "../atoms/ButtonProfileEditCard";

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
            <p className="text-nowrap">{jobPosition} </p>
            <p className="text-nowrap text-sm">
              {startDate} - {endDate}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {employer}, {country}
          </p>
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
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

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
    <div className=" bg-[#D7E6FD] p-4 rounded-lg" data-testid="experience-card">
      <div className="flex flex-row gap-2.5">
        <div className="w- min-w-6 ">
          <span className="material-symbols-outlined">business_center</span>
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
            classname="editButton"
            onClick={() => {
              editCard(id);
            }}
          >
            <span className="material-symbols-outlined">edit</span>
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

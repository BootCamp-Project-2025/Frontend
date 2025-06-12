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
          <span className="material-symbols-outlined">school</span>
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
            <span className="material-symbols-outlined">edit</span>
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

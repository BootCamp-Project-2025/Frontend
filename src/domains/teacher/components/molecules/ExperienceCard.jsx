import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export const ExperienceCard = ({
  id,
  position,
  employer,
  country,
  startDate,
  endDate,
  description,
  editCard,
  deleteCard,
}) => {
  return (
    <Card filled data-testid="experience-card">
      <InfoCardLayout
        icon={
          <span className="material-symbols-outlined">business_center</span>
        }
        title={position}
        body={
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row flex-wrap text-md font-semibold text-gray-800 gap-1.5 justify-between  items-center">
              <p className="text-nowrap text-base">
                {startDate} - {endDate}
              </p>
            </div>
            <p className="text-lg text-gray-500">
              {employer}, {country}
            </p>
            <p className="text-lg text-gray-500 line-clamp-3">{description}</p>
          </div>
        }
        onClickEdit={() => {
          editCard(id);
        }}
        onClickDelete={() => deleteCard({ id })}
      />
    </Card>
  );
};

ExperienceCard.propTypes = {
  id: PropTypes.string,
  position: PropTypes.string,
  employer: PropTypes.string,
  country: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  description: PropTypes.string,
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

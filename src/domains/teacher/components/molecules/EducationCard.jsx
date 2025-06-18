import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export const EducationCard = ({
  id,
  university,
  career,
  startDate,
  endDate,
  editCard,
}) => {
  return (
    <Card filled data-testid="experience-card">
      <InfoCardLayout
        icon={<span className="material-symbols-outlined">school</span>}
        title={university}
        body={
          <div className="flex flex-col gap-1 w-full">
            <p className="text-gray-500 text-lg">{career}</p>
            <p className="text-gray-500 text-base">
              {startDate}, {endDate}
            </p>
          </div>
        }
        onClickButton={() => {
          editCard(id);
        }}
      />
    </Card>
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

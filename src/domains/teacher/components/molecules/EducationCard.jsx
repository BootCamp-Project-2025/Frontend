import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export const EducationCard = ({
  id,
  university,
  career,
  startDate,
  finishDate,
  editCard,
  deleteCard,
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
              {startDate}, {finishDate}
            </p>
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

EducationCard.propTypes = {
  id: PropTypes.string,
  university: PropTypes.string,
  career: PropTypes.string,
  startDate: PropTypes.string,
  finishDate: PropTypes.string,
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

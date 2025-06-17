import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
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
      >
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
            color="warning"
            radius="full"
            square
            onClick={() => {
              editCard(id);
            }}
          >
            <Icon icon={"edit"} />
          </Button>
        </div>
      </InfoCardLayout>
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

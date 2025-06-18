import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";
import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";

export default function CertificationCard({ certification, onEdit }) {
  return (
    <Card filled data-testid="certification-card">
      <InfoCardLayout
        icon={
          <span className="material-symbols-outlined">workspace_premium</span>
        }
        title={certification.name}
        body={
          <div className="flex flex-col gap-1 w-full">
            <p className="text-gray-500 text-lg">{certification.institution}</p>
            <p className="text-gray-500 text-base">{certification.year}</p>
          </div>
        }
        onClickButton={() => onEdit(certification)}
      >
        <div className="w- min-w-6">
          <span className="material-symbols-outlined">workspace_premium</span>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row flex-wrap text-md font-semibold text-gray-800 gap-1.5 justify-between items-center">
            <p className="text-nowrap text-xl">{certification.name}</p>
          </div>
          <p className="text-gray-500 text-lg">{certification.institution}</p>
          <p className="text-gray-500 text-base">{certification.year}</p>
        </div>
        <div>
          <Button
            color="warning"
            radius="full"
            square
            onClick={() => onEdit(certification)}
          >
            <Icon icon={"edit"} />
          </Button>
        </div>
      </InfoCardLayout>
    </Card>
  );
}

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    institution: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onEdit: PropTypes.func,
};

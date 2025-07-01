import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export default function CertificationCard({
  certification,
  editCard = () => {},
  deleteCard = () => {},
}) {
  return (
    <Card filled>
      <InfoCardLayout
        icon={
          <span className="material-symbols-outlined">workspace_premium</span>
        }
        title={`${certification.name} - ${certification.year}`}
        body={
          <div className="flex flex-col gap-1 w-full">
            <p className="text-gray-500 text-lg">{certification.institution}</p>
            <p className="text-gray-500 text-base">{certification.year}</p>
          </div>
        }
        onClickEdit={() => {
          editCard(certification.id);
        }}
        onClickDelete={() => deleteCard(certification.id)}
      />
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
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

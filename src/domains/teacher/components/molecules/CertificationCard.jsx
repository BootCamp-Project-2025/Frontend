import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export default function CertificationCard({ certification, onEdit }) {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(certification);
    } else {
      console.error("onEdit function is not provided");
    }
  };

  return (
    <Card filled>
      <InfoCardLayout
        icon={<Icon icon={"certification"} className="w-8 h-8 mt-1" />}
        title={`${certification.name} - ${certification.year}`}
        body={
          <div>
            <span className="text-lg font-light">
              {certification.institution}
            </span>
          </div>
        }
        onClickButton={handleEditClick}
      ></InfoCardLayout>
    </Card>
  );
}

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    year: PropTypes.number.isRequired,
    name: PropTypes.string,
    institution: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
};

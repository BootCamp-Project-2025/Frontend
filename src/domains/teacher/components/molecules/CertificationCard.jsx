import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export default function CertificationCard({
  certification,
  institution,
  year,
  id,
  editCard,
  deleteCard,
}) {
  return (
    <Card filled>
      <InfoCardLayout
        icon={
          <span className="material-symbols-outlined">workspace_premium</span>
        }
        title={`${certification} - ${year}`}
        body={
          <div className="flex flex-col gap-1 w-full">
            <p className="text-gray-500 text-lg">{institution}</p>
            <p className="text-gray-500 text-base">{year}</p>
          </div>
        }
        onClickEdit={() => {
          editCard(id);
        }}
        onClickDelete={() => deleteCard({ id })}
      />
    </Card>
  );
}

CertificationCard.propTypes = {
  id: PropTypes.string,
  certification: PropTypes.string,
  institution: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

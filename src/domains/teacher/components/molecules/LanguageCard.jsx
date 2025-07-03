import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export const LanguageCard = ({
  id,
  name,
  proficiency,
  editCard,
  deleteCard,
}) => {
  return (
    <Card filled data-testid="language-card">
      <InfoCardLayout
        icon={<span className="material-symbols-outlined">language</span>}
        title={name}
        body={
          <p className="text-gray-600">
            {proficiency.charAt(0).toUpperCase() + proficiency.slice(1)}
          </p>
        }
        onClickEdit={() => editCard(id)}
        onClickDelete={() => deleteCard({ id })}
      />
    </Card>
  );
};

LanguageCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proficiency: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

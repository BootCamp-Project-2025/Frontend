import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";

export const LanguageCard = ({ id, name, level, editCard, deleteCard }) => {
  return (
    <Card filled data-testid="language-card">
      <InfoCardLayout
        icon={<span className="material-symbols-outlined">language</span>}
        title={name}
        body={
          <p className="text-gray-600">
            {level.charAt(0).toUpperCase() + level.slice(1)}
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
  level: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

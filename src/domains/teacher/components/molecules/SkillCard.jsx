import propTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";
import { Title } from "../../../../shared/components/atoms/Title";

function SkillCard({ id, skill, level, editCard, deleteCard }) {
  return (
    <Card filled data-testid="skill-card">
      <InfoCardLayout
        body={
          <div className="flex flex-col sm:flex-row sm:justify-between items-end w-full">
            <Title size="lg" color="default">
              {skill}
            </Title>
            <p>{level}</p>
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

export default SkillCard;

SkillCard.propTypes = {
  id: propTypes.string,
  skill: propTypes.string,
  level: propTypes.string,
  editCard: propTypes.func,
  deleteCard: propTypes.func,
};

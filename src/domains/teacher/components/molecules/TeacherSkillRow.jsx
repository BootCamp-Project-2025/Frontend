import propTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { InfoCardLayout } from "../atoms/InfoCardLayout";
import { Title } from "../../../../shared/components/atoms/Title";

function TeacherSkillRow({ skill, level, onclick }) {
  return (
    <Card filled data-testid="skill-card">
      <InfoCardLayout
        body={
          <div className="flex justify-between pr-16 w-full">
            <Title size="lg" color="default">
              {skill}
            </Title>
            <p className="self-end">{level}</p>
          </div>
        }
        onClickButton={onclick}
      />
    </Card>
  );
}

export default TeacherSkillRow;

TeacherSkillRow.propTypes = {
  skill: propTypes.string,
  level: propTypes.string,
  onclick: propTypes.func,
};

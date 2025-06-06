import propTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";

function TeacherSkillRow({ skill, level, edit }) {
  return (
    <div
      className="py-1 my-4 flex justify-between rounded-lg px-2"
      style={{ backgroundColor: "#D7E6FD" }}
    >
      <p className="font-bold self-start my-auto">{skill}</p>
      <div className="flex gap-1.5">
        <p className="self-end my-auto">{level}</p>
        <Button
          onClick={edit}
          classname="self-end flex-end mr-0 "
          styleType="editBtn"
        >
          ed
        </Button>
      </div>
    </div>
  );
}

export default TeacherSkillRow;

TeacherSkillRow.propTypes = {
  skill: propTypes.string,
  level: propTypes.string,
  onclick: propTypes.func,
};

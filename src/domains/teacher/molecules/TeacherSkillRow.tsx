import propTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";

function TeacherSkillRow({ skill, level, edit }) {
  return (
    <div
      className="py-1 my-4 flex justify-between rounded-lg px-2"
      style={{ backgroundColor: "#D7E6FD" }}
    >
      <p className="font-bold self-start my-auto font-sans">{skill}</p>
      <div className="flex gap-1.5">
        <p className="self-end my-auto font-sans">{level}</p>
        <Button
          onClick={edit}
          classname="self-end flex-end mr-0 "
          styleType="editBtn"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
            </g>
          </svg>
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

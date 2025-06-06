import propTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";
import TeacherSkillForm from "./TeacherSkillForm";
import { useState } from "react";

const buttonStyle = {
  backgroundColor: "#C5C5C5",
  borderRadius: "50%",
  height: "30px",
  width: "30px",
  lineHeight: "30px",
  textAlign: "center",
};

function TeacherSkillPopup({
  closePopup,
  className = "",
  style = {},
  skill = { skill: "", level: "Beginner" },
}) {
  const [skillState, setSkillState] = useState(skill);

  function deleteSkill() {
    console.log(skillState, "Delete skill functionality not implemented yet.");
    closePopup();
  }

  function saveSkill() {
    console.log(skillState, "Save skill functionality not implemented yet.");
  }
  return (
    <div style={style} className={`${className} relative`}>
      <div className="absolute right-0 ">
        <button
          onClick={() => closePopup()}
          style={buttonStyle}
          className=" bg-gray-400 text-white rounded-full p-0 cursor-pointer"
        >
          X
        </button>
      </div>
      <h4 className="font-sans text-blue-500 text-2xl font-bold text-center">
        Skill Form
      </h4>
      <TeacherSkillForm skill={skillState} update={setSkillState} />
      <div className="flex gap-4 justify-center mt-4">
        <div className="w-1/2 flex justify-end">
          <Button
            classname="font-sans"
            onClick={deleteSkill}
            color="pink"
            styleType="callToAction"
          >
            Delete
          </Button>
        </div>
        <div className="w-1/2 flex justify-start">
          <Button
            classname="font-sans"
            onClick={saveSkill}
            styleType="callToAction"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TeacherSkillPopup;

TeacherSkillPopup.propTypes = {
  closePopup: propTypes.func,
  className: propTypes.string,
  style: propTypes.object,
  skill: propTypes.object,
};

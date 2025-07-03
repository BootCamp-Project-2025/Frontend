import { useContext } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusExpansionWrapper from "../molecules/SyllabusExpansionWrapper";

export default function CourseModule({ modulePosition, ...props }) {
  const modulesContext = useContext(ModulesContext);

  const module = modulesContext.modules[modulePosition];

  const buttons = [
    {
      text: "Lesson",
      onClick: () => addLesson(modulePosition, module.lessons.length),
    },
    { text: "Quiz", onClick: () => console.log("Quiz") },
    { text: "Assignment", onClick: () => console.log("Assignment") },
  ];

  function addLesson(modulePosition, lessonPosition) {
    modulesContext.dispatch({
      type: "ADD_LESSON",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
    });
  }

  function eraseModule() {
    modulesContext.dispatch({
      type: "DELETE_MODULE",
      id: module.id,
    });
  }

  function saveTitle(newTitle) {
    modulesContext.dispatch({
      type: "EDIT_MODULE_TITLE",
      modulePosition: modulePosition,
      title: newTitle,
    });
  }

  function saveModule() {
    modulesContext.dispatch({
      type: "SAVE_MODULE",
      module: module,
    });
  }

  return (
    <SyllabusExpansionWrapper
      save={saveModule}
      saveTitle={saveTitle}
      erase={eraseModule}
      className="mt-10 mx-20"
      enableSave={module.edited ?? false}
      newSection={module.new ?? false}
      {...props}
      sectionTitle={`Module ${modulePosition + 1}`}
      title={module.title}
    >
      <ButtonSection buttonProps={buttons} />
      {module.lessons.map((lesson, id) => (
        <CourseLesson
          key={id}
          lessonPosition={id}
          modulePosition={modulePosition}
        />
      ))}
    </SyllabusExpansionWrapper>
  );
}

CourseModule.propTypes = {
  title: PropTypes.string,
  modulePosition: PropTypes.number,
};

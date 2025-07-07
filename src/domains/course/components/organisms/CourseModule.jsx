import { useContext } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusExpansionWrapper from "../molecules/SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";

export default function CourseModule({ modulePosition, ...props }) {
  const modulesContext = useContext(ModulesContext);
  const module = modulesContext.modules[modulePosition];
  const { openPopup, closePopup } = usePopup();
  const buttons = [
    {
      text: "Lesson",
      onClick: () =>
        modulesContext.dispatch({
          type: "ADD_LESSON",
          modulePosition: modulePosition,
          lessonPosition: module.lessons.length,
        }),
    },
    { text: "Quiz", onClick: () => console.log("Quiz") },
    { text: "Assignment", onClick: () => console.log("Assignment") },
  ];

  function eraseConfirmationPopUp() {
    openPopup(
      EraseConfirmation,
      {
        onDelete: eraseModule,
        closePopup: closePopup,
      },
      false
    );
  }

  function eraseModule() {
    modulesContext.dispatch({
      type: "DELETE_MODULE",
      modulePosition: module.position,
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
    console.log(module);
  }

  return (
    <SyllabusExpansionWrapper
      save={saveModule}
      saveTitle={saveTitle}
      erase={eraseConfirmationPopUp}
      className="mt-10 mx-20"
      enableSave={module.edited ?? false}
      newSection={module.new ?? false}
      {...props}
      sectionTitle={`Module ${modulePosition + 1}`}
      title={module.title}
    >
      <ButtonSection buttonProps={buttons} />
      {module.lessons.map((_, id) => (
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

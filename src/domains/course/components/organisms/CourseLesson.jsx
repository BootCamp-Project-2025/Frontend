import { useContext } from "react";
import ExpansionWrapper from "../molecules/ExpansionWrapper";
import ButtonSection from "../molecules/ModuleButtonSection";
import LessonContentGroup from "./LessonContentGroup";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";

export default function CourseLesson({ modulePosition, lessonPosition }) {
  const buttons = [
    { text: "Description", onClick: () => console.log("Description") },
    { text: "Video Content", onClick: () => console.log("Video Content") },
    { text: "Resources", onClick: () => console.log("Resources") },
  ];
  const modulesContext = useContext(ModulesContext);
  const lesson = modulesContext.modules[modulePosition].lessons[lessonPosition];

  function saveTitle(newTitle) {
    modulesContext.dispatch({
      type: "EDIT_LESSON_TITLE",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      title: newTitle,
    });
  }

  function saveLesson() {
    modulesContext.dispatch({
      type: "SAVE_LESSON",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      lesson: lesson,
    });
  }

  function eraseLesson() {
    modulesContext.dispatch({
      modulePosition: modulePosition,
      type: "DELETE_LESSON",
      id: lesson.id,
    });
  }
  return (
    <ExpansionWrapper
      save={saveLesson}
      saveTitle={saveTitle}
      erase={eraseLesson}
      className="border-b-1 border-gray-400 mx-10"
      borderTitle={false}
      enableSave={lesson.edited ?? false}
      sectionTitle={`Lesson ${lessonPosition + 1}`}
      title={lesson.title}
    >
      <ButtonSection buttonProps={buttons} />
      {modulesContext.modules[modulePosition].lessons[
        lessonPosition
      ].resources.map((lesson, id) => (
        <LessonContentGroup
          key={id}
          position={modulePosition}
          lessonPosition={lessonPosition}
          resource={id}
          title={lesson}
        />
      ))}
    </ExpansionWrapper>
  );
}

CourseLesson.propTypes = {
  modulePosition: PropTypes.number,
  lessonPosition: PropTypes.number,
};

import { useContext } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";
import SyllabusExpansionWrapper from "../molecules/SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { ApiDelete } from "../../api/ApiDelete";
import { ApiPost } from "../../api/ApiPost";
import { ApiPut } from "../../api/ApiPut";
import { useSearchParams } from "react-router-dom";

export default function CourseModule({ modulePosition, ...props }) {
  const modulesContext = useContext(ModulesContext);
  const module = modulesContext.modules[modulePosition];
  const [searchParams] = useSearchParams();
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

  async function eraseModule() {
    const { error } = await ApiDelete(`courses/modules/${module.id}`);
    if (error) return;
    modulesContext.dispatch({
      type: "DELETE_MODULE",
      modulePosition: module.position,
    });
  }

  async function saveModule() {
    let response;
    if (module.new)
      response = await ApiPost(
        `courses/${searchParams.get("course")}/modules`,
        module
      );
    if (module.edited)
      response = await ApiPut(`courses/modules/${module.id}`, module);
    if (!response.error)
      modulesContext.dispatch({
        modulePosition: modulePosition,
        type: "SAVE_MODULE",
        id: response.data.id,
      });
  }

  function saveTitle(newTitle) {
    modulesContext.dispatch({
      type: "EDIT_MODULE_TITLE",
      modulePosition: modulePosition,
      title: newTitle,
    });
  }

  function checkRepeatTitle(tittle) {
    if (
      modulesContext.modules.filter((module) => module.title === tittle)
        .length > 0
    ) {
      console.error("Module title already exists");
      return true;
    }
    return false;
  }

  return (
    <SyllabusExpansionWrapper
      save={saveModule}
      saveTitle={saveTitle}
      erase={eraseConfirmationPopUp}
      checkRepeatTitle={checkRepeatTitle}
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

import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import SyllabusExpansionWrapper from "./SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { ApiDelete } from "../../api/ApiDelete";
import { ApiPost } from "../../api/ApiPost";
import { ApiPut } from "../../api/ApiPut";
import { useSearchParams } from "react-router-dom";

export default function CourseModule({
  modules,
  dispatch,
  modulePosition,
  ...props
}) {
  const module = modules[modulePosition];
  const [searchParams] = useSearchParams();
  const { openPopup, closePopup } = usePopup();
  const buttons = [
    {
      text: "Lesson",
      onClick: () =>
        dispatch({
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
    if (module.id) {
      const { error } = await ApiDelete(`courses/modules/${module.id}`);
      if (error) return;
    }
    dispatch({
      type: "DELETE_MODULE",
      modulePosition: module.position,
    });
  }

  async function saveModule() {
    let response;
    if (module.new)
      response = await ApiPost(
        `courses/${searchParams.get("course")}/modules`,
        { title: module.title, position: module.position }
      );
    else if (module.edited)
      response = await ApiPut(`courses/modules/${module.id}`, {
        id: module.id,
        title: module.title,
        position: module.position,
      });
    if (!response.error)
      dispatch({
        modulePosition: modulePosition,
        type: "SAVE_MODULE",
        id: response.data.id,
      });
  }

  function saveTitle(newTitle) {
    dispatch({
      type: "EDIT_MODULE_TITLE",
      modulePosition: modulePosition,
      title: newTitle,
    });
  }

  function checkRepeatTitle(tittle) {
    if (
      modules.filter(
        (mod) => mod.title === tittle && mod.position !== module.position
      ).length > 0
    ) {
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
          modules={modules}
          dispatch={dispatch}
          id={`module-${modulePosition}-lesson-${id}`}
          key={`module-${modulePosition}-lesson-${id}`}
          lessonPosition={id}
          modulePosition={modulePosition}
        />
      ))}
    </SyllabusExpansionWrapper>
  );
}

CourseModule.propTypes = {
  title: PropTypes.string,
  modules: PropTypes.array,
  dispatch: PropTypes.func,
  modulePosition: PropTypes.number,
};

import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import SyllabusExpansionWrapper from "./SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { ApiDelete } from "../../api/ApiDelete";
import { ApiPost } from "../../api/ApiPost";
import { ApiPut } from "../../api/ApiPut";
import { useParams } from "react-router-dom";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { useEffect } from "react";

export default function CourseModule({
  modules,
  dispatch,
  modulePosition,
  ...props
}) {
  const module = modules[modulePosition];
  const { showToast } = useToastContext();
  const { courseId } = useParams();
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

  //add event listener for when the user close or refresh the tab
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (module.edited === true || module.new === true) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [module.edited, module.new]);

  async function eraseModule() {
    if (module.id) {
      const { error } = await ApiDelete(`courses/modules/${module.id}`);
      if (error) return;
    }
    showToast("The module was deleted successfully", "success");
    dispatch({
      type: "DELETE_MODULE",
      modulePosition: module.position,
    });
  }

  async function saveModule() {
    let response;
    // post or update the module depending if it has alredy been saved
    if (module.isNew)
      response = await ApiPost(`courses/${courseId}/modules`, {
        title: module.title,
        position: module.position,
      });
    else if (module.isEdited)
      response = await ApiPut(`courses/modules/${module.id}`, {
        id: module.id,
        title: module.title,
        position: module.position,
      });
    if (!response.error) {
      // only updates the view of the user if it has been sucessfully updated or created
      showToast("The module was saved successfully", "success");
      dispatch({
        modulePosition: modulePosition,
        type: "SAVE_MODULE",
        id: response.data.id,
      });
    } else
      showToast("A error has ocurred, the module couldnt be saved", "error");
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
      enableSave={module.isEdited ?? false}
      newSection={module.isNew ?? false}
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

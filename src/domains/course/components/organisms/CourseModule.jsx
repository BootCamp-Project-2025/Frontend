import ButtonSection from "../molecules/ModuleButtonSection";
import CourseLesson from "./CourseLesson";
import PropTypes from "prop-types";
import SyllabusExpansionWrapper from "./SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { ApiDelete } from "../../api/ApiDelete";
import { ApiPost } from "../../api/ApiPost";
import { ApiPut } from "../../api/ApiPut";
import { useParams, useBeforeUnload } from "react-router-dom";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import UploadQuiz from "../molecules/UploadQuiz";
import LessonContentGroup from "./LessonContentGroup";
import Module from "../../classes/Module";

export default function CourseModule({
  modules,
  dispatch,
  moduleIndex,
  ...props
}) {
  const module = modules[moduleIndex];
  const { showToast } = useToastContext();
  const { courseId } = useParams();
  const { openPopup, closePopup } = usePopup();
  const buttons = [
    {
      text: "Lesson",
      onClick: () =>
        dispatch({
          type: "ADD_LESSON",
          moduleIndex: moduleIndex,
          lessonIndex: module.lessons.length,
        }),
    },
    { text: "Quiz", onClick: () => uploadQuizPopUp() },
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

  function uploadQuizPopUp() {
    openPopup(
      UploadQuiz,
      {
        dispatch: dispatch,
        closePopup: closePopup,
        moduleIndex: moduleIndex,
      },
      false
    );
  }

  useBeforeUnload((event) => {
    if (module.isEdited || module.isNew) {
      event.preventDefault();
      return;
    }
  });

  async function eraseModule() {
    //only send an api request if the module is saved in the DB
    if (module.id) {
      const { error } = await ApiDelete(`modules/${module.id}`);
      if (error) {
        showToast("There was an error saving the module", "error");
        return;
      }
    }
    showToast("The module was deleted successfully", "success");
    dispatch({
      type: "DELETE_MODULE",
      modulePosition: module.position,
    });
  }

  async function saveModule() {
    let response = await handleupload();
    handleResponse(response);
  }

  async function handleupload() {
    if (module.isNew)
      return ApiPost(`courses/${courseId}/modules`, {
        title: module.title,
        position: module.position,
        quizzes: module.quizzes,
      });
    else
      return ApiPut(`modules/${module.id}`, {
        id: module.id,
        title: module.title,
        position: module.position,
        quizzes: module.quizzes,
      });
  }

  function handleResponse(response) {
    if (!response.error) {
      showToast("The module was saved successfully", "success");
      dispatch({
        moduleIndex: moduleIndex,
        type: "SAVE_MODULE",
        id: response.data.id,
      });
    } else
      showToast("A error has ocurred, the module couldnt be saved", "error");
  }

  function saveTitle(newTitle) {
    dispatch({
      type: "EDIT_MODULE_TITLE",
      moduleIndex: moduleIndex,
      title: newTitle,
    });
  }

  function checkRepeatTitle(tittle) {
    return (
      modules.filter(
        (mod) => mod.title === tittle && mod.position !== module.position
      ).length > 0
    );
  }

  function eraseQuiz(name) {
    dispatch({
      type: "DELETE_QUIZ",
      name: name,
      moduleIndex: moduleIndex,
    });
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
      sectionTitle={`Module ${moduleIndex + 1}`}
      title={module.title}
    >
      <ButtonSection buttonProps={buttons} />
      {module.lessons.map((lesson, lessonIndex) => (
        <CourseLesson
          modules={modules}
          dispatch={dispatch}
          id={`module-${moduleIndex}-lesson-${lessonIndex}`}
          key={lesson.position}
          lessonIndex={lessonIndex}
          moduleIndex={moduleIndex}
        />
      ))}
      <LessonContentGroup
        eraseResource={eraseQuiz}
        resources={module.quizzes}
        title={"Quizzes:"}
      />
    </SyllabusExpansionWrapper>
  );
}

CourseModule.propTypes = {
  title: PropTypes.string,
  modules: PropTypes.arrayOf(Module),
  dispatch: PropTypes.func,
  moduleIndex: PropTypes.number,
};

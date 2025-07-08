import { useContext, useState } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import LessonContentGroup from "./LessonContentGroup";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";
import SyllabusExpansionWrapper from "../molecules/SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { UploadModal } from "../../../../shared/components/molecules/UploadModal";
import { ApiPost } from "../../api/ApiPost";
import { ApiDelete } from "../../api/ApiDelete";
import UploadVideoUrl from "../molecules/UploadVideoUrl";
import { ApiPut } from "../../api/ApiPut";

export default function CourseLesson({ modulePosition, lessonPosition }) {
  const [modalOpen, setModalOpen] = useState(false);
  const modulesContext = useContext(ModulesContext);
  const lesson = modulesContext.modules[modulePosition].lessons[lessonPosition];
  const { openPopup, closePopup } = usePopup();

  const buttons = [
    { text: "Video Content", onClick: () => uploadVideoUrlPopUp() },
    { text: "Resources", onClick: () => setModalOpen(true) },
  ];

  function eraseConfirmationPopUp() {
    openPopup(
      EraseConfirmation,
      {
        onDelete: eraseLesson,
        closePopup: closePopup,
      },
      false
    );
  }

  function uploadVideoUrlPopUp() {
    openPopup(
      UploadVideoUrl,
      {
        saveVideo: saveVideo,
        closePopup: closePopup,
      },
      false
    );
  }

  const handleFileUpload = (file) => {
    console.log(file);
    addResource(file.name, file.name, lesson.resources.length);
  };

  function saveVideo(url) {
    modulesContext.dispatch({
      type: "ADD_VIDEO",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      url: url,
    });
  }

  function saveTitle(newTitle) {
    modulesContext.dispatch({
      type: "EDIT_LESSON_TITLE",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      title: newTitle,
    });
  }

  function addResource(name, url, resourcePosition) {
    modulesContext.dispatch({
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      type: "ADD_RESOURCE",
      name: name,
      resourcePosition: resourcePosition,
      url: url,
    });
  }

  async function eraseResource(name) {
    modulesContext.dispatch({
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      name: name,
      type: "DELETE_RESOURCE",
    });
  }

  async function eraseVideo(url) {
    modulesContext.dispatch({
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      url: url,
      type: "DELETE_VIDEO",
    });
  }

  async function saveLesson() {
    let response;
    if (lesson.new === true)
      response = await ApiPost(
        `courses/modules/${modulesContext.modules[modulePosition].id}/lessons`,
        lesson
      );
    else
      response = await ApiPut(
        `courses/modules/${modulesContext.modules[modulePosition].id}/lessons/${lesson.id}`,
        lesson
      );
    if (!response.error)
      modulesContext.dispatch({
        modulePosition: modulePosition,
        lessonPosition: lesson.position,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
  }

  async function eraseLesson() {
    const { error } = await ApiDelete(`courses/modules/lessons/${lesson.id}`);
    console.log(error);
    if (error) return;
    modulesContext.dispatch({
      modulePosition: modulePosition,
      lessonPosition: lesson.position,
      type: "DELETE_LESSON",
    });
  }

  return (
    <SyllabusExpansionWrapper
      save={saveLesson}
      saveTitle={saveTitle}
      erase={eraseConfirmationPopUp}
      className="border-b-1 border-gray-400 mx-10"
      borderTitle={false}
      enableSave={lesson.edited === true}
      newSection={lesson.new === true}
      sectionTitle={`Lesson ${lessonPosition + 1}`}
      title={lesson.title}
    >
      <TextEditor />
      <UploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onFileSelect={handleFileUpload}
        isDragOver={false}
      />
      <ButtonSection buttonProps={buttons} />
      <LessonContentGroup
        eraseResource={eraseVideo}
        resources={lesson.videoUrls}
        title={"Videos:"}
      />
      <LessonContentGroup
        eraseResource={eraseResource}
        resources={lesson.resources}
        title={"Resources:"}
      />
    </SyllabusExpansionWrapper>
  );
}

CourseLesson.propTypes = {
  modulePosition: PropTypes.number,
  lessonPosition: PropTypes.number,
};

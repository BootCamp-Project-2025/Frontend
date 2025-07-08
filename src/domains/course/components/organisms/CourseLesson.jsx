import { useContext, useRef, useState } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import LessonContentGroup from "./LessonContentGroup";
import PropTypes from "prop-types";
import { ModulesContext } from "../../customHooks/ModuleContext";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";
import SyllabusExpansionWrapper from "./SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { UploadModal } from "../../../../shared/components/molecules/UploadModal";
import { ApiPost } from "../../api/ApiPost";
import { ApiDelete } from "../../api/ApiDelete";
import UploadVideoUrl from "../molecules/UploadVideoUrl";
import { ApiPut } from "../../api/ApiPut";

export default function CourseLesson({ modulePosition, lessonPosition }) {
  const modulesContext = useContext(ModulesContext);
  const [descriptionEdited, setDescriptionEdited] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const lesson = modulesContext.modules[modulePosition].lessons[lessonPosition];
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(lesson.description);
  const inputOriginalRef = useRef(lesson.description);
  const { openPopup, closePopup } = usePopup();
  lesson.description = inputRef.current;

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
    if (
      lesson.resources.filter((savedFile) => savedFile.name === file.name)
        .length > 0
    ) {
      alert("Error: file name repeated, it will not be saved");
      return;
    }
    addResource(file.name, file.name, lesson.resources.length);
  };

  function saveVideo(url) {
    if (lesson.videoUrls.filter((savedUrl) => savedUrl === url).length > 0) {
      alert("Error: video url repeated, it will not be saved");
      return;
    }
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

  function checkRepeatTitle(tittle) {
    if (
      modulesContext.modules[modulePosition].lessons.filter(
        (less) => less.title === tittle && less.position !== lesson.position
      ).length > 0
    ) {
      return true;
    }
    return false;
  }

  function validateDescription() {
    if (inputRef.current.length < 30) {
      setDescriptionError("description is to short");
      return false;
    }
    if (inputRef.current.length > 1000) {
      setDescriptionError("description is to long");
      return false;
    }
    setDescriptionError("");
    return true;
  }

  async function saveLesson() {
    let response;
    if (modulesContext.modules[modulePosition].new === true) {
      alert("Error: module needs to be saved before lesson");
      return;
    }
    if (!validateDescription()) return;
    if (lesson.new === true)
      response = await ApiPost(
        `courses/modules/${modulesContext.modules[modulePosition].id}/lessons`,
        { ...lesson, description: inputRef.current }
      );
    else
      response = await ApiPut(
        `courses/modules/${modulesContext.modules[modulePosition].id}/lessons/${lesson.id}`,
        { ...lesson, description: inputRef.current }
      );
    if (!response.error)
      modulesContext.dispatch({
        modulePosition: modulePosition,
        lessonPosition: lesson.position,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
    setDescriptionEdited(false);
  }

  async function eraseLesson() {
    const { error } = await ApiDelete(`courses/modules/lessons/${lesson.id}`);
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
      checkRepeatTitle={checkRepeatTitle}
      saveTitle={saveTitle}
      erase={eraseConfirmationPopUp}
      className="border-b-1 border-gray-400 mx-10"
      borderTitle={false}
      enableSave={lesson.edited === true || descriptionEdited}
      newSection={lesson.new === true}
      sectionTitle={`Lesson ${lesson.position + 1}`}
      title={lesson.title}
    >
      <TextEditor
        value={inputRef.current}
        onChange={(e) => {
          if (inputOriginalRef.current === e) {
            return;
          }
          inputRef.current = e;
          setDescriptionEdited(true);
          validateDescription();
        }}
      />
      <span className="text-pink-500">{descriptionError}</span>
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

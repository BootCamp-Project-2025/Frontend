import { useState } from "react";
import ButtonSection from "../molecules/ModuleButtonSection";
import LessonContentGroup from "./LessonContentGroup";
import PropTypes from "prop-types";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";
import SyllabusExpansionWrapper from "./SyllabusExpansionWrapper";
import usePopup from "../../../../shared/hooks/usePopup";
import EraseConfirmation from "../molecules/EraseConfirmation";
import { UploadModal } from "../../../../shared/components/molecules/UploadModal";
import { ApiPost } from "../../api/ApiPost";
import { ApiDelete } from "../../api/ApiDelete";
import UploadVideoUrl from "../molecules/UploadVideoUrl";
import { ApiPut } from "../../api/ApiPut";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export default function CourseLesson({
  modules,
  dispatch,
  modulePosition,
  lessonPosition,
  ...props
}) {
  const { showToast } = useToastContext();
  const { openPopup, closePopup } = usePopup();
  const [descriptionError, setDescriptionError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const lesson = modules[modulePosition].lessons[lessonPosition];

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
      showToast("Error: File name repeated, it will not be saved", "error");
      return;
    }
    addResource(file.name, file.name, lesson.resources.length);
  };

  function saveVideo(url) {
    if (lesson.videoUrls.filter((savedUrl) => savedUrl === url).length > 0) {
      showToast("Error: video url repeated, it will not be saved", "error");
      return;
    }
    dispatch({
      type: "ADD_VIDEO",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      url: url,
    });
  }

  function saveTitle(newTitle) {
    dispatch({
      type: "EDIT_LESSON_TITLE",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      title: newTitle,
    });
  }

  function saveDescription(dedcription) {
    dispatch({
      type: "EDIT_LESSON_DESCRIPTION",
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      description: dedcription,
    });
  }

  function addResource(name, url, resourcePosition) {
    dispatch({
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      type: "ADD_RESOURCE",
      name: name,
      resourcePosition: resourcePosition,
      url: url,
    });
  }

  async function eraseResource(name) {
    dispatch({
      modulePosition: modulePosition,
      lessonPosition: lesson.position,
      name: name,
      type: "DELETE_RESOURCE",
    });
  }

  async function eraseVideo(url) {
    dispatch({
      modulePosition: modulePosition,
      lessonPosition: lessonPosition,
      url: url,
      type: "DELETE_VIDEO",
    });
  }

  function checkRepeatTitle(tittle) {
    if (
      modules[modulePosition].lessons.filter(
        (less) => less.title === tittle && less.position !== lesson.position
      ).length > 0
    ) {
      return true;
    }
    return false;
  }

  function validateDescription(dedcription) {
    if (dedcription.length < 30) {
      setDescriptionError("description is to short");
      return false;
    }
    if (dedcription.length > 1000) {
      setDescriptionError("description is to long");
      return false;
    }
    setDescriptionError("");
    return true;
  }

  async function saveLesson() {
    let response;
    //check if the father module exist in the db, if not it needs to be saved
    if (modules[modulePosition].new === true) {
      showToast("Error: module needs to be saved before lesson", "error");
      return;
    }
    // if description is not valid exits
    if (!validateDescription()) return;
    // post or update depending if the lesson is alredy saved
    if (lesson.new === true)
      response = await ApiPost(
        `courses/modules/${modules[modulePosition].id}/lessons`,
        { ...lesson }
      );
    else
      response = await ApiPut(
        `courses/modules/${modules[modulePosition].id}/lessons/${lesson.id}`,
        { ...lesson }
      );
    //// only updates the view of the user if it has been sucessfully updated or created or if it hasnt change
    if (!response.error || response.data.message === "Lesson not changed") {
      showToast("The lesson was saved successfully", "success");
      dispatch({
        modulePosition: modulePosition,
        lessonPosition: lessonPosition,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
    } else
      showToast("A error has ocurred, the lesson couldnt be saved", "error");
  }
  async function eraseLesson() {
    //if the lesson has an id it means that its saved in the db and it needs to send a request to delete it
    if (lesson.id) {
      const { error } = await ApiDelete(`courses/modules/lessons/${lesson.id}`);
      if (error) return;
    }
    showToast("the module was deleted successfully", "success");
    dispatch({
      modulePosition: modulePosition,
      lessonPosition: lesson.position,
      type: "DELETE_LESSON",
    });
  }

  return (
    <SyllabusExpansionWrapper
      {...props}
      save={saveLesson}
      checkRepeatTitle={checkRepeatTitle}
      saveTitle={saveTitle}
      erase={eraseConfirmationPopUp}
      className="border-b-1 border-gray-400 mx-10"
      borderTitle={false}
      enableSave={lesson.edited === true}
      newSection={lesson.new === true}
      sectionTitle={`Lesson ${lessonPosition + 1}`}
      title={lesson.title}
    >
      <TextEditor
        value={lesson.dedcription}
        onChange={(e) => {
          saveDescription(e);
          validateDescription(e);
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
  modules: PropTypes.array,
  dispatch: PropTypes.func,
  lessonPosition: PropTypes.number,
};

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
import { useBeforeUnload } from "react-router-dom";
import Module from "../../classes/Module";

export default function CourseLesson({
  modules,
  dispatch,
  moduleIndex,
  lessonIndex,
  ...props
}) {
  const { showToast } = useToastContext();
  const { openPopup, closePopup } = usePopup();
  const [descriptionError, setDescriptionError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const lesson = modules[moduleIndex].lessons[lessonIndex];

  const buttons = [
    { text: "Video Content", onClick: () => uploadVideoUrlPopUp() },
    { text: "Resource", onClick: () => setModalOpen(true) },
  ];

  useBeforeUnload((event) => {
    if (lesson.isEdited || lesson.isNew) {
      event.preventDefault();
      return;
    }
  });

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
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      url: url,
    });
  }

  function saveTitle(newTitle) {
    dispatch({
      type: "EDIT_LESSON_TITLE",
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      title: newTitle,
    });
  }

  function saveDescription(dedcription) {
    dispatch({
      type: "EDIT_LESSON_DESCRIPTION",
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      description: dedcription,
    });
  }

  function addResource(name, url, resourcePosition) {
    dispatch({
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      type: "ADD_RESOURCE",
      name: name,
      resourcePosition: resourcePosition,
      url: url,
    });
  }

  async function eraseResource(name) {
    dispatch({
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      name: name,
      type: "DELETE_RESOURCE",
    });
  }

  async function eraseVideo(url) {
    dispatch({
      moduleIndex: moduleIndex,
      lessonIndex: lessonIndex,
      url: url,
      type: "DELETE_VIDEO",
    });
  }

  async function eraseLesson() {
    //only send an api request if the module is saved in the DB
    if (lesson.id) {
      const { error } = await ApiDelete(`lessons/${lesson.id}`);
      if (error) {
        showToast("There was an error saving the module", "error");
        return;
      }
    }
    showToast("the module was deleted successfully", "success");
    dispatch({
      moduleIndex: moduleIndex,
      lessonIndex: lesson.position,
      type: "DELETE_LESSON",
    });
  }

  function checkRepeatTitle(tittle) {
    return (
      modules[moduleIndex].lessons.filter(
        (less) => less.title === tittle && less.position !== lesson.position
      ).length > 0
    );
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
    if (!validateDescription(lesson.description)) return;
    if (modules[moduleIndex].isNew) {
      showToast("Error: module needs to be saved before lesson", "error");
      return;
    }
    uploadLesson();
  }

  async function uploadLesson() {
    let response;
    response = await handleupload();
    if (!response.error || response.data.message === "Lesson not changed") {
      showToast("The lesson was saved successfully", "success");
      dispatch({
        moduleIndex: moduleIndex,
        lessonIndex: lessonIndex,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
    } else {
      showToast("A error has ocurred, the lesson couldnt be saved", "error");
    }
  }

  async function handleupload() {
    if (lesson.isNew) {
      return ApiPost(`modules/${modules[moduleIndex].id}/lessons`, {
        ...lesson,
      });
    } else {
      return ApiPut(`lessons/${lesson.id}`, { ...lesson });
    }
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
      enableSave={lesson.isEdited === true}
      newSection={lesson.isNew === true}
      sectionTitle={`Lesson ${lessonIndex + 1}`}
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
  moduleIndex: PropTypes.number,
  modules: PropTypes.arrayOf(Module),
  dispatch: PropTypes.func,
  lessonIndex: PropTypes.number,
};

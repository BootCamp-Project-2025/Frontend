import { useCallback, useState } from "react";
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
    }
  });

  const eraseLesson = useCallback(async () => {
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
      moduleIndex,
      lessonIndex: lesson.position,
      type: "DELETE_LESSON",
    });
  }, [dispatch, lesson.id, lesson.position, moduleIndex, showToast]);

  const eraseConfirmationPopUp = useCallback(() => {
    openPopup(
      EraseConfirmation,
      {
        onDelete: eraseLesson,
        closePopup,
      },
      false
    );
  }, [closePopup, eraseLesson, openPopup]);

  function uploadVideoUrlPopUp() {
    openPopup(
      UploadVideoUrl,
      {
        saveVideo,
        closePopup,
      },
      false
    );
  }

  const addResource = useCallback(
    (name, url, resourcePosition) => {
      dispatch({
        moduleIndex,
        lessonIndex,
        type: "ADD_RESOURCE",
        name,
        resourcePosition,
        url,
      });
    },
    [dispatch, lessonIndex, moduleIndex]
  );

  const handleFileUpload = useCallback(
    (file) => {
      if (
        lesson.resources.filter((savedFile) => savedFile.name === file.name)
          .length > 0
      ) {
        showToast("Error: File name repeated, it will not be saved", "error");
        return;
      }
      addResource(file.name, file.name, lesson.resources.length);
    },
    [addResource, lesson.resources, showToast]
  );

  function saveVideo(url) {
    if (lesson.videoUrls.filter((savedUrl) => savedUrl === url).length > 0) {
      showToast("Error: video url repeated, it will not be saved", "error");
      return;
    }
    dispatch({
      type: "ADD_VIDEO",
      moduleIndex,
      lessonIndex,
      url,
    });
  }

  const saveTitle = useCallback(
    (newTitle) => {
      dispatch({
        type: "EDIT_LESSON_TITLE",
        moduleIndex,
        lessonIndex,
        title: newTitle,
      });
    },
    [dispatch, lessonIndex, moduleIndex]
  );

  const saveDescription = useCallback(
    (dedcription) => {
      dispatch({
        type: "EDIT_LESSON_DESCRIPTION",
        moduleIndex,
        lessonIndex,
        description: dedcription,
      });
    },
    [dispatch, lessonIndex, moduleIndex]
  );

  const eraseResource = useCallback(
    (name) => {
      dispatch({
        moduleIndex,
        lessonIndex,
        name,
        type: "DELETE_RESOURCE",
      });
    },
    [dispatch, lessonIndex, moduleIndex]
  );

  const eraseVideo = useCallback(
    (url) => {
      dispatch({
        moduleIndex,
        lessonIndex,
        url,
        type: "DELETE_VIDEO",
      });
    },
    [dispatch, lessonIndex, moduleIndex]
  );

  const checkRepeatTitle = useCallback(
    (tittle) => {
      return (
        modules[moduleIndex].lessons.filter(
          (less) => less.title === tittle && less.position !== lesson.position
        ).length > 0
      );
    },
    [lesson.position, moduleIndex, modules]
  );

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

  const handleupload = useCallback(() => {
    if (lesson.isNew) {
      return ApiPost(`modules/${modules[moduleIndex].id}/lessons`, {
        ...lesson,
      });
    } else {
      return ApiPut(`lessons/${lesson.id}`, { ...lesson });
    }
  }, [lesson, moduleIndex, modules]);

  const uploadLesson = useCallback(async () => {
    const response = await handleupload();
    if (!response.error) {
      dispatch({
        moduleIndex,
        lessonIndex,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
      showToast("The lesson was saved successfully", "success");
    } else if (response.data.message === "Lesson not changed") {
      dispatch({
        moduleIndex,
        lessonIndex,
        id: response.data.id,
        type: "SAVE_LESSON",
      });
      showToast("The lesson did not have changes", "warning");
    } else {
      showToast("A error has ocurred, the lesson couldnt be saved", "error");
    }
  }, [dispatch, handleupload, lessonIndex, moduleIndex, showToast]);

  const saveLesson = useCallback(() => {
    if (!validateDescription(lesson.description)) return;
    if (modules[moduleIndex].isNew) {
      showToast("Error: module needs to be saved before lesson", "error");
      return;
    }
    uploadLesson();
  }, [lesson.description, moduleIndex, modules, showToast, uploadLesson]);

  const handleTextEditorChange = useCallback(
    (e) => {
      saveDescription(e);
      validateDescription(e);
    },
    [saveDescription]
  );

  const closeFileModal = useCallback(() => {
    setModalOpen(false);
  }, []);

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
        value={lesson.description}
        onChange={handleTextEditorChange}
      />
      <span className="text-pink-500">{descriptionError}</span>
      <UploadModal
        isOpen={modalOpen}
        onClose={closeFileModal}
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

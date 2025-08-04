import { useCallback, useEffect, useState } from "react";
import { Title } from "../../../../shared/components/atoms/Title";
import { ChatHeader } from "../../../chat/components/organisms/ChatHeader";
import P2PContentSection from "./P2PContentSection";
import "./css/P2PCourse.css";
import ChatTemplate from "../../../chat/components/templates/ChatTemplate";
import { Icon } from "../../../../shared/components/atoms/Icon";
import SessionList from "./SessionList";
import usePopup from "../../../../shared/hooks/usePopup";
import PostForm from "./PostForm";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";
import SessionForm from "./SessionForm";
import { useUploader } from "../../../../shared/hooks/useUploader";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../../shared/api/getRequest";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { postRequest } from "../../../../shared/api/postRequest";
import { putRequest } from "../../../../shared/api/putRequest";
import { deleteRequest } from "../../../../shared/api/deleteRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { patchRequest } from "../../../../shared/api/patchRequest";

export default function P2PCourse() {
  const { showToast } = useToastContext();
  const { openWidget } = useUploader(saveFilePost);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { openPopup, closePopup } = usePopup();
  const params = useParams();

  const loadData = useCallback(async () => {
    const response = await getRequest(
      `/p2pCourses/${params.p2pCourseId}/userCourse`
    );
    setLoading(false);
    if (!response.success) {
      console.log(response.data);
      setError(true);
      return;
    }

    setCourse(response.data.data);
  }, [params.p2pCourseId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleResponse = useCallback(
    (response) => {
      console.log(response);
      if (response.success) {
        loadData();
        showToast(response.data?.message ?? "Success", "success");
      } else {
        showToast(response.error?.response.data.message ?? "Error", "error");
      }
    },
    [loadData, showToast]
  );

  async function saveFilePost(url) {
    const response = await postRequest(
      `/p2pCourses/${params.p2pCourseId}/files`,
      { url, creationDate: new Date() }
    );
    handleResponse(response);
  }

  const erase = useCallback(
    async (id, resource) => {
      const response = await deleteRequest(
        `/p2pCourses/${params.p2pCourseId}/${resource}/${id}`
      );
      handleResponse(response);
    },
    [handleResponse, params.p2pCourseId]
  );

  const saveOrEdit = useCallback(
    async (data, resource) => {
      let response;
      if (data.id) {
        response = await putRequest(
          `/p2pCourses/${params.p2pCourseId}/${resource}/${data.id}`,
          data
        );
      } else {
        response = await postRequest(
          `/p2pCourses/${params.p2pCourseId}/${resource}`,
          data
        );
      }
      handleResponse(response);
    },
    [handleResponse, params.p2pCourseId]
  );

  const complete = useCallback(
    async (id) => {
      const response = await patchRequest(
        `/p2pCourses/${params.p2pCourseId}/sessions/${id}/complete`
      );
      handleResponse(response);
    },
    [handleResponse, params.p2pCourseId]
  );

  /**
   * Calls an API post, it changes the endpoint depending on the type.
   * @param type: It defines what type of create whe whan, it can be SESSION, POST, FILE.
   * @param data: A object that holds the information we are trying to save.
   */
  const handleSavePopUp = useCallback(
    async (type) => {
      switch (type) {
        case "SESSION": {
          openPopup(SessionForm, { closePopup, saveOrEdit }, false);
          break;
        }
        case "POST": {
          openPopup(PostForm, { closePopup, saveOrEdit }, false);
          break;
        }
        case "FILE":
          openWidget();
          break;
      }
    },
    [closePopup, openPopup, openWidget, saveOrEdit]
  );

  const handleEditPopUp = useCallback(
    async (type, data) => {
      switch (type) {
        case "SESSION": {
          openPopup(
            SessionForm,
            { closePopup, saveOrEdit, session: data },
            false
          );
          break;
        }
        case "POST": {
          openPopup(PostForm, { closePopup, saveOrEdit, post: data }, false);
          break;
        }
      }
    },
    [closePopup, openPopup, saveOrEdit]
  );

  const handleErasePopUp = useCallback(
    (type, id) => {
      switch (type) {
        case "SESSION": {
          openPopup(
            DeleteCardPopup,
            { closePopup, deleteAction: (id) => erase(id, "sessions"), id },
            true
          );
          break;
        }
        case "POST": {
          openPopup(
            DeleteCardPopup,
            { closePopup, deleteAction: (id) => erase(id, "posts"), id },
            true
          );
          break;
        }
        case "FILE": {
          openPopup(
            DeleteCardPopup,
            { closePopup, deleteAction: (id) => erase(id, "files"), id },
            true
          );
          break;
        }
      }
    },
    [closePopup, erase, openPopup]
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Alert
        type="error"
        description="There was an error loading the data"
      ></Alert>
    );
  }

  return (
    <div className="static mx-10">
      <Title className="text-center" size="xxl" color="default">
        Course Name
      </Title>
      <div className="mt-5 grid grid-cols-[65%_30%] gap-x-[5%]">
        <P2PContentSection
          save={handleSavePopUp}
          edit={handleEditPopUp}
          erase={handleErasePopUp}
          postList={course.posts}
          filePostList={course.files}
          className="col-start-0"
        />
        <SessionList
          remainingSession={course.remainingSession}
          save={handleSavePopUp}
          edit={handleEditPopUp}
          erase={handleErasePopUp}
          complete={complete}
          sessionList={course.sessions}
          className="col-start-1"
        />
      </div>

      {showChat ? (
        <div
          className={`fixed bottom-4 right-10 max-w-2/3 max-h-2/3 overflow-auto bg-white border-1`}
        >
          <ChatTemplate chatIdProp={course.chatId} />
          <button
            onClick={() => setShowChat((show) => !show)}
            className="h-5 w-5 sticky left-[95%] bottom-[93%] hover:cursor-pointer"
          >
            <Icon icon={"vectorDown"} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setShowChat((show) => !show)}
          className={`fixed float-start bottom-4 right-10 w-[30%]  bg-white border-1 hover:cursor-pointer`}
        >
          <ChatHeader participantsIds={[course.studentId, course.teacherId]} />
        </div>
      )}
    </div>
  );
}

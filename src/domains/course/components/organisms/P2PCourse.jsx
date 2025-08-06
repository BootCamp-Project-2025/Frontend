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
import { useLocation, useParams } from "react-router-dom";
import { getRequest } from "../../../../shared/api/getRequest";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { postRequest } from "../../../../shared/api/postRequest";
import { putRequest } from "../../../../shared/api/putRequest";
import { deleteRequest } from "../../../../shared/api/deleteRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { patchRequest } from "../../../../shared/api/patchRequest";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function P2PCourse() {
  const { showToast } = useToastContext();
  const { openWidget } = useUploader(saveFilePost, "ltcrowd_preset_temp");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { openPopup, closePopup } = usePopup();
  const params = useParams();
  const location = useLocation();
  const isTeacher = location.pathname.includes("/teacher");
  const { user } = useAuth();

  const loadData = useCallback(async () => {
    const response = await getRequest(
      `/p2pCourses/${params.p2pCourseId}/userCourse`
    );
    setLoading(false);
    if (!response.success) {
      setError(true);
      return;
    }
    setCourse(response.data.data);
  }, [params.p2pCourseId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * Shows a diferent toast depending of the success of the request and refresh the data
   * @param response return of the api call to the backend
   */
  const handleResponse = useCallback(
    (response) => {
      if (response.success) {
        loadData();
        showToast(response.data?.message ?? "Success", "success");
      } else {
        showToast(response.error?.response.data.message ?? "Error", "error");
      }
    },
    [loadData, showToast]
  );

  async function saveFilePost(cndData) {
    const response = await postRequest(
      `/p2pCourses/${params.p2pCourseId}/files`,
      { url: cndData.url, creationDate: new Date() }
    );
    handleResponse(response);
  }

  /**
   * Call a delete request on a resource with the id
   * @param id identifier of the resource to be erased
   * @param resource what is the resource to be saved or edit. it can be "sessions", "files", "posts"
   */
  const erase = useCallback(
    async (id, resource) => {
      const response = await deleteRequest(
        `/p2pCourses/${params.p2pCourseId}/${resource}/${id}`
      );
      handleResponse(response);
    },
    [handleResponse, params.p2pCourseId]
  );

  /**
   * Call a post request if there is no id in the data, or an update if there is. The request varies depending on the resource
   * @param data data to be saved. If it countains an id it means that it alredy existed so it needs an updated
   * @param resource what is the resource to be saved or edit. it can be "sessions", "files", "posts"
   */
  const saveOrEdit = useCallback(
    async (data, resource) => {
      let response = null;
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

  /**
   * Mark a session as completed
   * @param id: session to be completed
   */
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
   * Open a different pop up depending on the type
   * @param type: It defines what type of create whe whan, it can be SESSION, POST, FILE.
   */
  const handleSavePopUp = useCallback(
    (type) => {
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
        default:
          break;
      }
    },
    [closePopup, openPopup, openWidget, saveOrEdit]
  );

  /**
   * Open a different pop up depending on the type
   * @param type: It defines what type of create whe whan, it can be SESSION, POST, FILE.
   * @param data: Initial data that will have the pop up. Is the data to be edited
   */
  const handleEditPopUp = useCallback(
    (type, data) => {
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
        default:
          break;
      }
    },
    [closePopup, openPopup, saveOrEdit]
  );

  /**
   * Open a different delete pop up depending on the type
   * @param type: It defines what type of create whe whan, it can be SESSION, POST, FILE.
   * @param id: Id of the element to be deleted
   */
  const handleErasePopUp = useCallback(
    (type, id) => {
      switch (type) {
        case "SESSION": {
          openPopup(
            DeleteCardPopup,
            {
              closePopup,
              title: "Delete the session",
              msg: "Are you sure you want to delete the session",
              deleteAction: (sessionId) => erase(sessionId, "sessions"),
              id,
            },
            true
          );
          break;
        }
        case "POST": {
          openPopup(
            DeleteCardPopup,
            {
              closePopup,
              title: "Delete the post",
              msg: "Are you sure you want to delete the post",
              deleteAction: (postId) => erase(postId, "posts"),
              id,
            },
            true
          );
          break;
        }
        case "FILE": {
          openPopup(
            DeleteCardPopup,
            {
              closePopup,
              title: "Delete the file",
              msg: "Are you sure you want to delete the file, you will not be able to recover the file after it's deleted",
              deleteAction: (fileId) => erase(fileId, "files"),
              id,
            },
            true
          );
          break;
        }
        default:
          break;
      }
    },
    [closePopup, erase, openPopup]
  );

  const handleChatVisibility = useCallback(
    () => setShowChat((show) => !show),
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Alert
        type="error"
        title="Error"
        description="There was an error loading the data"
      ></Alert>
    );
  }

  return (
    <div className="static mx-10">
      <Title className="text-center" size="xxl" color="default">
        {course.name}
      </Title>
      <div className="mt-5 grid grid-cols-[65%_30%] gap-x-[5%]">
        <P2PContentSection
          save={isTeacher ? handleSavePopUp : undefined}
          edit={isTeacher ? handleEditPopUp : undefined}
          erase={isTeacher ? handleErasePopUp : undefined}
          postList={course.posts}
          filePostList={course.files}
          className="col-start-0"
        />
        <SessionList
          remainingSession={course.remainingSession}
          save={isTeacher ? handleSavePopUp : undefined}
          edit={isTeacher ? handleEditPopUp : undefined}
          erase={isTeacher ? handleErasePopUp : undefined}
          complete={isTeacher ? complete : undefined}
          sessionList={course.sessions}
          className="col-start-1"
        />
      </div>

      {showChat ? (
        <div
          className={
            "fixed bottom-4 right-10 w-2/4 h-2/3 overflow-y-hidden bg-white border-1"
          }
        >
          <ChatTemplate chatIdProp={course.chatId} />
          <button
            onClick={handleChatVisibility}
            className="h-5 w-5 sticky left-[95%] bottom-[93%] hover:cursor-pointer"
          >
            <Icon icon={"vectorDown"} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleChatVisibility}
          className={
            "fixed float-start bottom-4 right-10 w-[30%]  bg-white border-1 hover:cursor-pointer"
          }
        >
          <ChatHeader
            chat={{
              name: "",
              participantsIds: [course.studentId, course.teacherId],
              status: "P2P",
            }}
            ownerId={user ? user.id : ""}
          />
        </button>
      )}
    </div>
  );
}

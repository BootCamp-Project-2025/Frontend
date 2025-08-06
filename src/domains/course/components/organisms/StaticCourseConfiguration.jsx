import { useParams } from "react-router-dom";
import { UseGet } from "../../api/UseGet";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { useEffect, useState } from "react";
import { Title } from "../../../../shared/components/atoms/Title";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { Toggle } from "../../../../shared/components/atoms/Toggle";
import { baseAPI } from "../../../../shared/api/axios/AxiosConnection";

export const StaticCourseConfiguration = () => {
  const { courseId } = useParams();
  const { responseData, loading, error } = UseGet("courses", courseId);
  const { showToast } = useToastContext();

  const [published, setPublished] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [canPublish, setCanPublish] = useState(true);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    if (responseData) {
      setPublished(responseData.data.published);

      const missing = [];
      if (!responseData.data.language) {
        missing.push("Language is required");
      }
      if (!responseData.data.category) {
        missing.push("Category is required");
      }
      if (!responseData.data.subCategory) {
        missing.push("Subcategory is required");
      }

      setMissingFields(missing);
      setCanPublish(missing.length === 0);
      console.log(responseData);
    }
  }, [responseData]);

  const handleToggle = async (newState) => {
    if (newState && !canPublish) {
      showToast(
        "You must complete all required fields before publishing.",
        "error"
      );
      return;
    }

    try {
      setUpdating(true);
      await baseAPI.put(`/courses/${courseId}/publish`, {
        published: newState,
      });
      setPublished(newState);
      showToast(
        `Course is now ${newState ? "published" : "unpublished"}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      showToast("Error updating course status.Try  again later", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="wrapper flex flex-col w-full gap-5 px-8 py-4 mx-auto">
      <Title className="border-b-1" color="default">
        Configuration
      </Title>

      {loading && <Loading text="Loading course data"></Loading>}
      {!loading && error && (
        <Alert
          type="error"
          title="Data couldn't be loaded. Please try again later."
        ></Alert>
      )}
      {!loading && !error && (
        <>
          <Title color="default" size="md">
            Publish Course:
          </Title>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p className="pl-3.5 text-sm relative">
              <span
                className={`absolute w-1.5 h-1.5 left-0 top-2 rounded-full bg-gray-500`}
              ></span>
              You can control the visibility of your course using the toggle
              below. When a course is <strong>published</strong>, it will appear
              in the public search and can be discovered by students.
            </p>
            <p className="pl-3.5 text-sm relative">
              <span
                className={`absolute w-1.5 h-1.5 left-0 top-2 rounded-full bg-gray-500`}
              ></span>
              Once published,
              <strong>
                you will no longer be able to edit the course content
              </strong>
              until it is unpublished again.
            </p>
            <p className="pl-3.5 text-sm relative">
              <span
                className={`absolute w-1.5 h-1.5 left-0 top-2 rounded-full bg-gray-500`}
              ></span>
              To publish your course, make sure that the following required
              fields are filled in: language, category, and subcategory.
            </p>
          </div>
          <div className="flex gap-3.5 items-center ">
            <Toggle
              label="Published:"
              enabled={published}
              onToggle={handleToggle}
              disabled={updating}
            />
            {updating && (
              <div>
                <Loading hideText size="xs"></Loading>
              </div>
            )}
          </div>
          {missingFields.length > 0 && !published && (
            <Alert
              type="warn"
              title="Missing required fields to publish"
              description="You must complete the following fields before publishing:"
              list={missingFields}
            />
          )}
          {published && (
            <Alert
              type="info"
              title="This course is public"
              description="While published, editing of course content is disabled."
            />
          )}
        </>
      )}
    </div>
  );
};

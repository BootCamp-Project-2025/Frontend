import { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import Badge from "../../../../shared/components/atoms/Badge";
import { Toggle } from "../../../../shared/components/atoms/Toggle";
import { baseAPI } from "../../../../shared/api/axios/AxiosConnection";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { Loading } from "../../../../shared/components/molecules/Loading";

function CourseCard({
  courseId,
  courseName,
  courseDescription,
  courseImage,
  published = false,
  language,
  category,
  subCategory,
  onEditClick,
  onDeleteClick,
}) {
  const { showToast } = useToastContext();
  const [isPublished, setIsPublished] = useState(published);
  const [updating, setUpdating] = useState(false);

  const handleToggle = async (newState) => {
    const missingFields = [];

    if (!language) missingFields.push("Language");
    if (!category) missingFields.push("Category");
    if (!subCategory) missingFields.push("Subcategory");

    if (newState && missingFields.length > 0) {
      showToast(
        "First, Complete required fields in course configuration.",
        "error"
      );
      return;
    }

    try {
      setUpdating(true);
      await baseAPI.put(`/courses/${courseId}/publish`, {
        published: newState,
      });
      setIsPublished(newState);
      showToast(
        `Course has been ${newState ? "published" : "unpublished"}.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating course:", error);
      showToast("Error updating course. Please try again later.", "error");
    } finally {
      setUpdating(false);
    }
  };

  const deleteCourse = () => {
    if (isPublished) {
      showToast("You must unpublish the course before deleting it", "error");
    } else {
      onDeleteClick();
    }
  };

  return (
    <Card radius="none" className="p-4 flex flex-col gap-4">
      <div className="flex items-start gap-4 justify-between">
        <div className="flex gap-4">
          <img
            src={courseImage}
            alt={`${courseName} image`}
            className="w-48 h-32 object-cover"
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center mb-1">
              <Badge color={isPublished ? "green" : "gray"}>
                {isPublished ? "Published" : "Unpublished"}
              </Badge>
              <Title color="default" size="md" className="line-clamp-1">
                {courseName}
              </Title>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {courseDescription}
            </p>
            <div className="flex gap-3.5 items-center">
              <Toggle
                label={"Published:"}
                enabled={isPublished}
                onToggle={handleToggle}
                disabled={updating}
              />
              {updating && (
                <div>
                  <Loading hideText size="xs"></Loading>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <Button
            variant="bordered"
            className="w-24 py-2"
            onClick={onEditClick}
            contentClassName="justify-center"
          >
            Edit
          </Button>
          <Button
            variant="bordered"
            color="default"
            className="w-24 py-2"
            onClick={deleteCourse}
            contentClassName="justify-center"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

CourseCard.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseDescription: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  published: PropTypes.bool,
  language: PropTypes.string,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default CourseCard;

import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Card } from "../../../../shared/components/atoms/Card";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../../../teacher/components/atoms/PopupFormLayout";
import CourseForm from "../../../teacher/components/molecules/CourseForm";
import { ConfirmDeleteCourse } from "./ConfirmDeleteCourse";
import { useUpdateCourse } from "../../../course/customHooks/UseUpdateCourse";
import { useDeleteCourse } from "../../customHooks/UseDeleteCourse";

function CourseCard({
  courseId,
  courseName,
  courseDescription,
  courseImage,
  onEditClick,
  onDeleteClick,
}) {
  const { openPopup, closePopup } = usePopup();
  const { update } = useUpdateCourse();
  const [showDialog, setShowDialog] = useState(false);
  const { remove } = useDeleteCourse();

  function editCourse() {
    console.log(`deleted course ${courseId}`);
    openPopup(
      PopupFormLayout,
      {
        title: "Edit the information",
        children: (
          <CourseForm
            closePopup={closePopup}
            defaultValues={{
              name: courseName,
              description: courseDescription,
            }}
            onSubmit={async (data) => {
              await update(courseId, data);
              closePopup();
              onEditClick?.({ id: courseId, ...data });
            }}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  }

  function deleteCourse() {
    console.log(`deleted course ${courseId}`);
    setShowDialog(true);
  }

  const handleDelete = async () => {
    await remove(courseId);
    setShowDialog(false);
    onDeleteClick?.(courseId);
  };

  return (
    <Card
      className="flex flex-row space-x-4 gap-10 justify-between"
      radius="none"
    >
      <div className="flex flex-row">
        <img
          style={{ width: "12rem", height: "10rem" }}
          src={courseImage}
          alt="course image"
        />
        <div className="mx-auto">
          <Title color="secondary" className="px-2 py-1">
            {courseName}
          </Title>
          <p className="px-2 py-1">{courseDescription}</p>
        </div>
      </div>

      <div className="justify-center flex flex-col gap-3">
        <Button
          variant="bordered"
          className="w-20"
          contentClassName="justify-center"
          onClick={editCourse}
        >
          Edit
        </Button>
        <Button onClick={deleteCourse} color="default" variant="bordered">
          Delete
        </Button>
      </div>
      <ConfirmDeleteCourse
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        courseName={courseName}
      />
    </Card>
  );
}
export default CourseCard;

CourseCard.propTypes = {
  courseName: PropTypes.string,
  courseId: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  courseImage: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

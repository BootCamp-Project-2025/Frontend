import React from "react";
import PropTypes from "prop-types";
import { Card } from "../../../../shared/components/atoms/Card";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";

function CourseCard({
  courseName,
  courseDescription,
  courseImage,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <Card radius="none" className="p-4 flex items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <img
          src={courseImage}
          alt={`${courseName} image`}
          className="w-48 h-32 object-cover"
        />
        <div>
          <Title color="default" size="md" className="mb-1">
            {courseName}
          </Title>
          <p className="text-sm text-gray-600">{courseDescription}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="bordered"
          className="w-24 py-2"
          onClick={onEditClick}
          contentClassName={"justify-center"}
        >
          Edit
        </Button>
        <Button
          variant="bordered"
          color="default"
          className="w-24 py-2"
          onClick={onDeleteClick}
          contentClassName={"justify-center"}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

CourseCard.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseDescription: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default CourseCard;

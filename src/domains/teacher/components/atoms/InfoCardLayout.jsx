import PropTypes from "prop-types";
import React from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
export function InfoCardLayout({
  icon,
  title,
  body,
  onClickEdit = () => {},
  onClickDelete = () => {},
}) {
  return (
    <div className="flex flex-row gap-2.5 justify-between">
      {icon && <div className="w- min-w-6 ">{icon}</div>}
      <div className="w-full justify-start">
        <Title size="md" color="default">
          {title}
        </Title>
        <div className="mx-2">{body}</div>
      </div>
      <div className="flex gap-2 items-start">
        <Button
          color="default"
          radius="full"
          square
          size="sm"
          onClick={onClickEdit}
        >
          <Icon icon={"edit"} />
        </Button>
        <Button
          color="default"
          radius="full"
          square
          size="sm"
          onClick={onClickDelete}
        >
          <Icon icon={"delete"} />
        </Button>
      </div>
    </div>
  );
}

InfoCardLayout.propTypes = {
  icon: React.ReactNode,
  title: React.ReactNode,
  body: React.ReactNode,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

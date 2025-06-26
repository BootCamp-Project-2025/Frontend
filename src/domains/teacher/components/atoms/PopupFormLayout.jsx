import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export function PopupFormLayout({ children, onClose = () => {}, title }) {
  return (
    <div
      className="bg-white rounded-md relative p-2 flex flex-col"
      style={{ width: "600px", height: "auto" }}
    >
      <div className="mb-4">
        <Title className="justify-self-center">{title}</Title>
      </div>
      <Button
        aria-label="Close form"
        color="default"
        radius="full"
        onClick={onClose}
        square
        className={"absolute top-1 right-1"}
      >
        <Icon icon="close" className="w-3 h-3" />
      </Button>
      <div className="w-full">{children}</div>
    </div>
  );
}

PopupFormLayout.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node.isRequired,
};

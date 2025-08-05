import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";

export default function ButtonSection({ buttonProps, ...props }) {
  return (
    <div className="flex justify-center gap-4 mt-2" {...props}>
      {buttonProps.map((buttonData) => (
        <Button
          key={buttonData.text}
          radius="small"
          onClick={buttonData.onClick}
          className={`w-40 text-center self-end ${buttonData.className ?? ""}`}
          variant="bordered"
          size="sm"
        >
          <div className="flex w-full items-center">
            <Icon icon={"plus"} />
            <p className="mx-auto">{buttonData.text}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}

ButtonSection.propTypes = {
  buttonProps: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      className: PropTypes.string,
    })
  ).isRequired,
};

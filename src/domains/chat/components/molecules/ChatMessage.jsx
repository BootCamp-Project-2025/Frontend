import clsx from "clsx";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import { formatTime } from "../../../../shared/utils/formatTime";

const containerBaseStyle = "flex gap-1 text-sm";
const boxBaseStyle = "px-1 py-0.5 flex flex-col rounded-xl max-w-9/12 min-w-60";
const styles = {
  sent: {
    container: "justify-end",
    box: "bg-primary-100 rounded-tr-none",
  },
  received: {
    container: "justify-start",
    box: "bg-secondary-200 rounded-tl-none",
  },
};
const iconBaseStyle = "self-end w-5 h-5";
const iconVariantMap = {
  SENT: "msgSent",
  DELIVERED: "msgDelivered",
  READ: "msgRead",
  ERROR: "msgError",
};

export function ChatMessage({
  variant = "sent",
  type,
  time,
  iconVariant = "SENT",
  displayStatus = false,
  marginBottom,
  content,
}) {
  const sanitizedContent = DOMPurify.sanitize(content);

  //* This method renders the content of the message
  //? To add more types of messages just add a new case to handle it and return a component
  const renderContent = () => {
    switch (type) {
      case "TEXT":
        return (
          <div
            className="px-4 py-2 break-words"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
        );

      default:
        return <div className="text-danger-500">Unknown type of message</div>;
    }
  };
  return (
    <div
      className={clsx(
        containerBaseStyle,
        styles[variant]["container"],
        marginBottom ? "mb-5" : "mb-2"
      )}
    >
      <div className={clsx(boxBaseStyle, styles[variant]["box"])}>
        {renderContent()}
        {time ? (
          <div className="self-end pr-1 pb-1 text-secondary-700">
            {formatTime(time)}
          </div>
        ) : null}
      </div>
      {variant === "sent" ? (
        <Icon
          icon={iconVariantMap[iconVariant]}
          className={clsx(iconBaseStyle, displayStatus ? "" : "opacity-0")}
        />
      ) : null}
    </div>
  );
}

ChatMessage.propTypes = {
  variant: PropTypes.oneOf(["sent", "received"]),
  type: PropTypes.oneOf(["TEXT"]),
  time: PropTypes.object,
  iconVariant: PropTypes.oneOf(["SENT", "DELIVERED", "READ", "ERROR"]),
  displayStatus: PropTypes.bool,
  marginBottom: PropTypes.bool,
  content: PropTypes.string,
};

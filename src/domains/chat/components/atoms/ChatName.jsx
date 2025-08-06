import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { useMemo } from "react";
export function ChatName({ chat, userName, showUserName }) {
  const showBadge = useMemo(() => {
    return chat.status != "ACTIVE";
  }, [chat.status]);

  const formatedName = useMemo(() => {
    if (chat.name) return chat.name + (showUserName ? ` - ${userName}` : "");
    else return userName;
  }, [chat.name, userName, showUserName]);

  return (
    <div className="flex items-end gap-2 max-w-4/5 overflow-x-hidden">
      {showBadge ? <p>{chat.status}</p> : null}
      <Title size="md" color="default" className="">
        {formatedName}
      </Title>
    </div>
  );
}

ChatName.propTypes = {
  chat: PropTypes.shape({
    status: PropTypes.string,
    name: PropTypes.string,
  }),
  userName: PropTypes.string,
  displayDefaultName: PropTypes.bool,
  showUserName: PropTypes.bool,
};

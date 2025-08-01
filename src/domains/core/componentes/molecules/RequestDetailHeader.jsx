import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";

const RequestDetailHeader = ({ request }) => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col w-full bg-[var(--color-secondary-800)] p-8 text-[color:var(--color-secondary-50)] gap-6">
      <button
        onClick={handleNavigate}
        className="p-2 rounded-full bg-[var(--color-secondary-50)] hover:bg-[var(--color-secondary-200)] max-w-min cursor-pointer"
      >
        <Icon icon={"arrowBack"} />
      </button>
      <div className="flex justify-between">
        <Title size="xl" className="text-[color:var(--color-secondary-50)]">
          {request.title}
        </Title>
        {user && <Button>Send a message</Button>}
      </div>

      <p>
        Created by
        <span className="text-[color:var(--color-primary-500)]">
          {request.userName}
        </span>
      </p>
    </div>
  );
};

export default RequestDetailHeader;
RequestDetailHeader.propTypes = {
  request: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
};

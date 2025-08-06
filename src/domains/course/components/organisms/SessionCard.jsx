import { useCallback } from "react";
import { Title } from "../../../../shared/components/atoms/Title";
import P2PCardButtons from "../molecules/P2PCardButtons";
import SessionTime from "../molecules/SessionTime";
import PropTypes from "prop-types";

export default function SessionCard({
  session,
  erase,
  edit,
  complete,
  className,
}) {
  const handleEdit = useCallback(() => {
    edit("SESSION", session);
  }, [edit, session]);

  const handleErase = useCallback(() => {
    erase("SESSION", session.id);
  }, [erase, session.id]);

  const handleComplete = useCallback(() => {
    complete(session.id);
  }, [complete, session.id]);
  return (
    <div className={`p2pCard-template ${className}`}>
      {session.status === "COMPLETED" ? (
        <span className="text-green-600">Completed</span>
      ) : (
        <P2PCardButtons
          edit={edit ? handleEdit : undefined}
          erase={erase ? handleErase : undefined}
          complete={complete ? handleComplete : undefined}
        />
      )}
      <SessionTime timestamp={session.dateOfTheSession} />
      <Title color="default">Room</Title>
      <a
        href={session.url}
        target="_blank"
        className="text-blue-500"
        rel="noreferrer"
      >
        {session.url}
      </a>
    </div>
  );
}

SessionCard.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    dateOfTheSession: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  erase: PropTypes.func,
  edit: PropTypes.func,
  complete: PropTypes.func,
  className: PropTypes.string.isRequired,
};

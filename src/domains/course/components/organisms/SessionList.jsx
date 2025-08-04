import { useCallback, useMemo } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import SessionCard from "./SessionCard";
import PropTypes from "prop-types";
import { Alert } from "../../../../shared/components/molecules/Alert";

export default function SessionList({
  sessionList,
  save,
  edit,
  erase,
  complete,
  remainingSession,
}) {
  const completedSessions = useMemo(
    () => sessionList.filter((session) => session.status === "COMPLETED"),
    [sessionList]
  );
  const availableSessions = useMemo(
    () =>
      sessionList.filter((session) => {
        return (
          (session.status === "PENDING") &
          (new Date(session.dateOfTheSession).getTime() >= new Date().getTime())
        );
      }),
    [sessionList]
  );
  const expiredSessions = useMemo(
    () =>
      sessionList.filter((session) => {
        return (
          (session.status === "PENDING") &
          (new Date(session.dateOfTheSession).getTime() < new Date().getTime())
        );
      }),
    [sessionList]
  );

  const handleSave = useCallback(() => {
    save("SESSION");
  }, [save]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Title className="" size="xl" color="default">
          Sessions
        </Title>
        <span className="my-auto ml-3">Pending: {remainingSession}</span>
        {save ?? (
          <Button
            onClick={handleSave}
            className="ml-auto"
            radius="full"
            variant="bordered"
          >
            +
          </Button>
        )}
      </div>
      {sessionList.length === 0 ? (
        <Alert type="info" title="No sessions" />
      ) : (
        <></>
      )}
      {availableSessions.map((session) => (
        <SessionCard
          className={"p2pCard-shadow-active"}
          edit={edit}
          erase={erase}
          key={session.id}
          session={session}
        />
      ))}
      {expiredSessions.map((session) => (
        <SessionCard
          className={"p2pCard-shadow-disabled"}
          complete={complete}
          edit={edit}
          erase={erase}
          key={session.id}
          session={session}
        />
      ))}
      {completedSessions.map((session) => (
        <SessionCard
          className={"p2pCard-shadow-active"}
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
}

SessionList.propTypes = {
  sessionList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      dateOfTheSession: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  remainingSession: PropTypes.number.isRequired,
  save: PropTypes.func,
  edit: PropTypes.func,
  erase: PropTypes.func,
  complete: PropTypes.func,
};

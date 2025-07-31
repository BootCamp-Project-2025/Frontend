import { Button } from "../../../../shared/components/atoms/Button";
import { Icon } from "../../../../shared/components/atoms/Icon";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const SessionsSchedule = ({ sessions, onSessionsChange }) => {
  const addSession = () => {
    const newSession = {
      id: Date.now(),
      name: "",
      date: "",
      hour: "",
    };
    onSessionsChange([...sessions, newSession]);
  };

  const updateSession = (id, field, value) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, [field]: value } : session
    );
    onSessionsChange(updatedSessions);
  };

  const removeSession = (id) => {
    const filteredSessions = sessions.filter((session) => session.id !== id);
    onSessionsChange(filteredSessions);
  };

  useEffect(() => {
    console.log("sessions updated:", sessions);
  }, [sessions]);

  return (
    <div className="mb-6">
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center bg-gray-200">
          <div className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-300">
            Classes Detail
          </div>
          <div className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-300">
            Date
          </div>
          <div className="flex-1 px-4 py-3 text-sm font-medium text-gray-700">
            Hour
          </div>
          <div className="w-16 px-4 py-3 flex justify-center">
            <Button
              onClick={() => addSession()}
              color="primary"
              radius="full"
              square
              className="w-10 h-10"
              contentClassName="text-white justify-center items-center text-2xl"
              aria-label="Add session"
            >
              +
            </Button>
          </div>
        </div>

        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center border-t border-gray-300 bg-white"
          >
            <div className="flex-1 px-4 py-3 border-r border-gray-300">
              <input
                type="text"
                value={session.name}
                onChange={(e) =>
                  updateSession(session.id, "name", e.target.value)
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Session name"
              />
            </div>
            <div className="flex-1 px-4 py-3 border-r border-gray-300">
              <input
                type="date"
                value={session.date}
                onChange={(e) =>
                  updateSession(session.id, "date", e.target.value)
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 px-4 py-3">
              <input
                type="time"
                value={session.hour}
                onChange={(e) =>
                  updateSession(session.id, "hour", e.target.value)
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="w-16 px-4 py-3 flex justify-center">
              <Button
                onClick={() => removeSession(session.id)}
                color="danger"
                variant="ghost"
                square
                className="px-0 py-0"
                aria-label="Remove session"
              >
                <Icon icon="trashCan" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SessionsSchedule.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      hour: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSessionsChange: PropTypes.func.isRequired,
};

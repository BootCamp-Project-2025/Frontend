import React from "react";
import { X, Plus, Calendar, Clock } from "lucide-react";

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

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Sessions Schedule</h3>
        <button
          onClick={addSession}
          className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                Sessions Detail
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Hour
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session.id} className="border-t border-gray-300">
                <td className="px-4 py-3 border-r border-gray-300">
                  <input
                    type="text"
                    value={session.name}
                    onChange={(e) =>
                      updateSession(session.id, "name", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Session name"
                  />
                </td>
                <td className="px-4 py-3 border-r border-gray-300">
                  <div className="relative">
                    <input
                      type="date"
                      value={session.date}
                      onChange={(e) =>
                        updateSession(session.id, "date", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Calendar
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={14}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="time"
                        value={session.hour}
                        onChange={(e) =>
                          updateSession(session.id, "hour", e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Clock
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={14}
                      />
                    </div>
                    {sessions.length > 1 && (
                      <button
                        onClick={() => removeSession(session.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

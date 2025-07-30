import { DescriptionField } from "../molecules/DescriptionField";
import { SessionsSchedule } from "../molecules/SessionsSchedule";
import { StartDateField } from "../molecules/StartDateField";

export default function ProposalForm({
  requestTitle = "DefoultTitle",
  description = "this will be a large description",
  setDescription = () => {
    console.log("new description");
  },
  sessions = [],
  setSessions = () => {
    console.log("sessions activity");
  },
  startDate = new Date(),
  setStartDate = () => {
    console.log("startdate activity");
  },
}) {
  const onClose = () => {
    console.log("close the modal");
  };

  const handleSend = () => {
    console.log("sending data...");
  };

  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Proposal</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ❌
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-600">Request: </span>
          <span className="text-sm font-medium">"{requestTitle}"</span>
        </div>

        <DescriptionField value={description} onChange={setDescription} />

        <SessionsSchedule sessions={sessions} onSessionsChange={setSessions} />

        <StartDateField value={startDate} onChange={setStartDate} />
      </div>

      <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

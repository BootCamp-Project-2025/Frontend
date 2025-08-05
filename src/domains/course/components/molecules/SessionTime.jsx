import { Icon } from "../../../../shared/components/atoms/Icon";
import { Title } from "../../../../shared/components/atoms/Title";
import PropTypes from "prop-types";

export default function SessionTime({ timestamp }) {
  const date = new Date(timestamp);

  return (
    <div className="flex gap-2 flex-col">
      <Title color="default">Time</Title>
      <div className="flex gap-3">
        <Icon className={"h-5 w-5"} icon={"calendar"} />
        <span> {date.toLocaleDateString()}</span>
      </div>
      <div className="flex gap-3">
        <Icon className={"h-5 w-5"} icon={"clock"} />
        <span>
          {date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
SessionTime.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

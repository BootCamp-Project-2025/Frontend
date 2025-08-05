import PropTypes from "prop-types";

export default function ProgressBar({ progress }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200 w-full">
      <div className="relative h-6 w-65 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${clampedProgress * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold ml-2">
        {Math.round(clampedProgress * 100)}%
      </span>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

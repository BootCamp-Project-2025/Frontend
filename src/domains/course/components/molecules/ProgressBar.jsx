export default function ProgressBar({ progress }) {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200">
      {/* Círculo indicador */}
      <div className="w-6 h-6 rounded-full bg-blue-500" />
      <span className="text-sm font-semibold">{progress}%</span>
    </div>
  );
}

import { Icon } from "../../../../shared/components/atoms/Icon";
import { useNavigate } from "react-router-dom";

export default function CourseTitleNavigation({
  title,
  moduleTitle,
  lessonTitle,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row bg-black p-4 gap-4">
      <div className="flex items-start gap-4 w-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          <Icon icon="arrowForward" className="w-6 h-6 rotate-180 text-white" />
        </button>
      </div>
      <div className=" flex flex-col">
        <spam className="text-white text-3xl font-extrabold">{title}</spam>
        <span className="text-blue-400 text-base mt-1">
          {moduleTitle} &gt; {lessonTitle}
        </span>
      </div>
    </div>
  );
}

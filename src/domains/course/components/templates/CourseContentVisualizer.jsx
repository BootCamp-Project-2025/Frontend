import CourseResourcePart from "../organisms/CourseResourcesPart";
import CourseTitleNavigation from "../organisms/CourseTitleNavigation";

export default function CourseContentVisualizer() {
  return (
    <div className="flex flex-col">
      <CourseTitleNavigation />
      <div>Video player</div>
      <div>PDF visualizer</div>
      <div>Description</div>
      <CourseResourcePart />
    </div>
  );
}

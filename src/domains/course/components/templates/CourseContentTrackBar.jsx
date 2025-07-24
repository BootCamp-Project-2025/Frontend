export default function CourseContentTrackBar({
  content,
  setCurrentContent,
  progress,
}) {
  const handleClickOnContent = (resource) => {
    setCurrentContent(resource);
  };

  return (
    <div className="flex flex-col">
      <div>Here will be the progress bar</div>
      <div>Here will be the modules</div>
    </div>
  );
}

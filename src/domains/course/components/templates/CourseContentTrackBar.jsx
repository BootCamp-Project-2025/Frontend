export default function CourseContentTrackBar({
  content,
  setCurrentContent,
  progress,
}) {
  console.log(content);
  const handleClickOnContent = (resource) => {
    setCurrentContent(resource);
  };
  console.log(progress);

  return (
    <div className="flex flex-col">
      <div>Here will be the progress bar</div>
      <div>Here will be the modules</div>
    </div>
  );
}

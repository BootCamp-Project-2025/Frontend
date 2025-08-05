import PropTypes from "prop-types";
import { ResourcePropType } from "./LessonPlayer";

export default function PdfVisualiser({ url, resource, onComplete }) {
  const handleLoad = () => {
    onComplete({
      ...resource,
      type: "pdf",
      url,
    });
  };

  return (
    <div className="flex justify-center w-full h-full">
      <iframe
        src={url}
        className="w-full h-[80vh] border rounded"
        title="PDF Viewer"
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
}

PdfVisualiser.propTypes = {
  url: PropTypes.string.isRequired,
  resource: ResourcePropType.isRequired,
  onComplete: PropTypes.func.isRequired,
};

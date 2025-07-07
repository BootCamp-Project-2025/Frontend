import PropTypes from "prop-types";

export default function PdfViewer({ url }) {
  return (
    <iframe
      src={url}
      title="PDF visualizer"
      width="100%"
      height="600px"
      style={{ border: "none", marginTop: "1rem" }}
    />
  );
}

PdfUploader.propTypes = {
  url: PropTypes.string,
};

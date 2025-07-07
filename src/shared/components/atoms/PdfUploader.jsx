import { useUploader } from "../../hooks/useUploader";
import PropTypes from "prop-types";

export default function PdfUploader({ onUpload }) {
  const { openWidget } = useUploader(onUpload);

  return <button onClick={openWidget}>Subir PDF</button>;
}

PdfUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

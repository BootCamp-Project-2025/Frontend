import { useUploader } from "../../hooks/useUploader";

export default function PdfUploader({ onUpload }) {
  const { openWidget } = useUploader(onUpload);

  return <button onClick={openWidget}>Subir PDF</button>;
}

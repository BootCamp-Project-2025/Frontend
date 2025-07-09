import { useState } from "react";
import PdfUploader from "./PdfUploader";
import PdfViewer from "./PdfViewer";

export default function DocComponent() {
  const [pdfUrl, setPdfUrl] = useState("");
  return (
    <div>
      <PdfUploader onUpload={setPdfUrl} />

      {pdfUrl ? <PdfViewer url={pdfUrl} /> : <p>No documents uploaded yet</p>}
    </div>
  );
}

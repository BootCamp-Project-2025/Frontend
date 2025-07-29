import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfVisualiser({ url, resource, onComplete }) {
  const handleDocumentLoadSuccess = () => {
    onComplete({
      ...resource,
      type: "pdf",
      url,
    });
  };

  return (
    <div className="flex justify-center">
      <Document
        file={url}
        onLoadSuccess={handleDocumentLoadSuccess}
        className="border rounded shadow"
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

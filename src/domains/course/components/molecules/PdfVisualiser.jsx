import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfVisualiser({ url, resource, onComplete }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (url && !url.startsWith("http")) {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => setFile(blob));
    } else {
      setFile(url);
    }
  }, [url]);

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
        file={file}
        onLoadSuccess={handleDocumentLoadSuccess}
        className="border rounded shadow"
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

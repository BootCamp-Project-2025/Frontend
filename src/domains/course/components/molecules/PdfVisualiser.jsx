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

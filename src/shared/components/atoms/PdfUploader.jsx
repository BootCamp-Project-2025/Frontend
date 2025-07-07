// PdfUploader.jsx
import React, { useEffect, useRef } from "react";

export default function PdfUploader({ onUpload }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Inicializa el widget sólo una vez
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "ltcrowd-cdn",
        uploadPreset: "ltcrowd_preset",
        resourceType: "raw", // RAW para PDF y otros docs
        clientAllowedFormats: ["pdf"], // restringe a PDFs
        multiple: false,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("PDF subido:", result.info);
          onUpload(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <button onClick={() => widgetRef.current && widgetRef.current.open()}>
      Subir PDF
    </button>
  );
}

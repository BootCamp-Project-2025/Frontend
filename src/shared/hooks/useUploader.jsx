import { useEffect, useRef } from "react";

export function useUploader(onUpload) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary no está disponible.");
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "deado6aup",
        uploadPreset: "cloudi_test_temp",
        resourceType: "raw",
        clientAllowedFormats: ["pdf", "doc", "docx", "jpg", "jpeg", "png"],
        multiple: false,
        sources: ["local"],
        folder: "temp",
        maxFileSize: 10000000,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("PDF subido:", result.info);
          onUpload(result.info);
        }
      }
    );
  }, [onUpload]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  return { openWidget };
}

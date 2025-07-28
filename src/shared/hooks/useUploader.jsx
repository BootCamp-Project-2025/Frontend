import { useEffect, useRef } from "react";

export function useUploader(onUpload, preset) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary no está disponible.");
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "ltcrowd-cdn",
        uploadPreset: preset || "ltcrowd_preset",
        resourceType: "raw",
        clientAllowedFormats: ["pdf", "doc", "docx", "jpg", "jpeg", "png"],
        multiple: false,
        sources: ["local"],
        maxFileSize: 10000000,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("PDF subido:", result.info);
          onUpload(result.info);
        }
      }
    );
  }, [onUpload, preset]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  return { openWidget };
}

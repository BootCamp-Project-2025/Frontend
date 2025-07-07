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
        cloudName: "ltcrowd-cdn",
        uploadPreset: "ltcrowd_preset",
        resourceType: "raw",
        clientAllowedFormats: ["pdf", "doc", "docx"],
        multiple: false,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("PDF subido:", result.info);
          onUpload(result.info.secure_url);
        }
      }
    );
  }, [onUpload]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  return { openWidget };
}

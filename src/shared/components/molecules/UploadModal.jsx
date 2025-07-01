import { FileText, X, Image } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared/components/atoms/Button";

export const UploadModal = ({
  isOpen,
  onClose,
  fileType,
  onFileSelect,
  isDragOver,
  onDragOver,
  onDragLeave,
}) => {
  const fileInputRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setLocalFile(null);
      setPreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isImage = fileType === "image";
  const acceptedTypes = isImage ? "PNG, JPG, JPEG" : "PDF, TXT, DOC, XLS";

  const acceptAttribute = isImage
    ? "image/*"
    : ".pdf, .txt, .doc, .docx, .xls, .xlsx";

  const IconComponent = isImage ? Image : FileText;

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(file);
      if (isImage && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSave = () => {
    if (localFile) {
      onFileSelect(localFile);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 easy-out ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-lg relative transform transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-gray-600" />
        </button>

        <h3 className="text-lg font-semibold mb-6 text-center">
          Upload or Drag {isImage ? "an Image" : "a Document"}
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) {
              setLocalFile(file);
              if (isImage && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => setPreview(e.target.result);
                reader.readAsDataURL(file);
              } else {
                setPreview(null);
              }
            }
          }}
          onClick={handleFileInputClick}
        >
          {isImage && preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto mb-2 max-h-40 object-contain rounded"
            />
          ) : (
            <div className="flex items-center justify-center gap-2 mb-2">
              <IconComponent size={32} className="text-gray-400" />
              <p className="text-sm text-gray-600">
                Click to select {isImage ? "an image" : "a file"} or drag and
                drop it here
              </p>
            </div>
          )}
          <p className="text-xs text-gray-500">({acceptedTypes})</p>

          <input
            ref={fileInputRef}
            type="file"
            accept={acceptAttribute}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-center space-x-3 mt-6">
          <Button color="default" variant="bordered" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={handleSave}
            disabled={!localFile}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fileType: PropTypes.oneOf(["image", "document"]).isRequired,
  onFileSelect: PropTypes.func.isRequired,
  isDragOver: PropTypes.bool,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
};

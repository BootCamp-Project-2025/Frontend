import { FileText, X, Image } from "lucide-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Button } from "../../../shared/components/atoms/Button";

export const UploadModal = ({
  isOpen,
  onClose,
  fileType,
  onFileSelect,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const fileInputRef = useRef(null);

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
      onFileSelect(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Upload or Drag {isImage ? "an Image" : "a Document"}
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={handleFileInputClick}
        >
          <IconComponent size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-gray-600 mb-1">
            Click to select {isImage ? "an image" : "a file"} or drag and drop
            it here
          </p>
          <p className="text-xs text-gray-500">({acceptedTypes})</p>

          <input
            ref={fileInputRef}
            type="file"
            accept={acceptAttribute}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button color="default" variant="bordered" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={handleFileInputClick}
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
  onDrop: PropTypes.func,
};

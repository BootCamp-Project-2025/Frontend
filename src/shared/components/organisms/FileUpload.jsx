import { useState } from "react";
import { X, Image, FileText } from "lucide-react";
import PropTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";
import { UploadModal } from "../molecules/UploadModal";

export const FileUpload = ({
  label = "Upload your file here",
  description = "The file must meet the quality standards.",
  guidelines = "Important guidelines: 000 x 000 pixels; format .jpg, .jpeg, .gif, or .png.",
  fileType = "image",
  onFileUpload,
  className = "",
  buttonColor = "primary",
  buttonVariant = "solid",
  buttonSize = "md",
  maxFileSize = 5 * 1024 * 1024,
  customValidation,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    const isImage = fileType === "image";
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    const validDocTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const validTypes = isImage ? validImageTypes : validDocTypes;

    if (!validTypes.includes(file.type)) {
      return `Invalid file type. Please select a valid ${fileType}.`;
    }

    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is ${(maxFileSize / 1024 / 1024).toFixed(1)}MB.`;
    }

    if (customValidation) {
      const customError = customValidation(file);
      if (customError) return customError;
    }

    return null;
  };

  const handleFileSelect = (file) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSelectedFile(file);

    if (fileType === "image" && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    setIsModalOpen(false);

    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError("");
  };

  return (
    <>
      <div className={`w-full ${className}`}>
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side - Icon and text */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  {fileType === "image" ? (
                    <Image size={32} className="text-gray-400" />
                  ) : (
                    <FileText size={32} className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                  {label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {description}
                </p>
                <p className="text-xs text-gray-500">{guidelines}</p>
              </div>
            </div>

            {/* Right side - Upload button */}
            <div className="flex-shrink-0">
              <Button
                color={buttonColor}
                variant={buttonVariant}
                size={buttonSize}
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                Upload File
              </Button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* File preview */}
        {selectedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <FileText size={24} className="text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={removeFile}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileType={fileType}
        onFileSelect={handleFileSelect}
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    </>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  guidelines: PropTypes.string,
  fileType: PropTypes.oneOf(["image", "document"]),
  onFileUpload: PropTypes.func,
  className: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonVariant: PropTypes.string,
  buttonSize: PropTypes.string,
  maxFileSize: PropTypes.number,
  customValidation: PropTypes.func,
};

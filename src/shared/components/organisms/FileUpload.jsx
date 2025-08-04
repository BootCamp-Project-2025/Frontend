import { useState } from "react";
import { X, Image, FileText } from "lucide-react";
import PropTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";
import { UploadModal } from "../molecules/UploadModal";
import { useUploader } from "../../../shared/hooks/useUploader";

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
  initialPreview = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(initialPreview);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const { openWidget } = useUploader((fileInfo) => {
    setSelectedFile({
      name: fileInfo.original_filename,
      size: fileInfo.bytes, // Convert bytes to MB
      type: "image",
    });
    setPreview(fileInfo.secure_url);
    if (onFileUpload) {
      onFileUpload(fileInfo.secure_url);
    }
  });

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
    if (initialPreview) {
      setPreview(initialPreview);
    } else {
      setPreview(null);
    }
    if (onFileUpload) {
      onFileUpload(null);
    }
    setError("");
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const getPlaceholderText = () => {
    if (fileType === "image") {
      return "Select an Image";
    }
    return "Select a Document";
  };

  return (
    <>
      <div className={`w-full ${className}`}>
        {/* Main Upload Container */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Preview/Icon Area */}
            <div className="flex-shrink-0">
              <div className="w-full lg:w-64 h-48 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                      {fileType === "image" ? (
                        <Image size={32} className="text-gray-400" />
                      ) : (
                        <FileText size={32} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Content and Controls */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {label}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <p className="text-xs text-gray-500">{guidelines}</p>
              </div>

              {/* File Input and Upload Button */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedFile ? selectedFile.name : ""}
                      placeholder={getPlaceholderText()}
                      readOnly
                      className="w-full bg-white py-2 px-3 rounded-md  outline-1 outline-gray-400 focus:outline-2 focus:outline-blue-500 text-sm cursor-pointer"
                      onClick={handleInputClick}
                    />
                    {selectedFile && (
                      <button
                        onClick={removeFile}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <Button
                  color={buttonColor}
                  variant={buttonVariant}
                  size={buttonSize}
                  onClick={openWidget}
                  className="flex-shrink-0"
                >
                  Upload File
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* File info when selected */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  {fileType === "image" ? (
                    <Image size={16} className="text-gray-500" />
                  ) : (
                    <FileText size={16} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
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
        preview={preview}
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
  initialPreview: PropTypes.string,
};

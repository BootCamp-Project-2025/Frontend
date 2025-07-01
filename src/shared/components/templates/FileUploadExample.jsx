import { FileUpload } from "../organisms/FileUpload";

const FileUploadExample = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        File Upload Component Demo
      </h1>

      {/* Image Upload Example */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Image Upload (Course Image)
        </h2>
        <FileUpload
          label="Upload your course image here"
          description="The image must meet the quality standards for course images."
          guidelines="Important guidelines: 1200 x 800 pixels; format .jpg, .jpeg, .gif, or .png."
          fileType="image"
          onFileUpload={(file) => console.log("Image uploaded:", file)}
          buttonColor="primary"
          buttonVariant="solid"
          buttonSize="md"
        />
      </div>

      {/* Document Upload Example */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Document Upload (Course Resources)
        </h2>
        <FileUpload
          label="Upload your course resource here"
          description="Upload supporting materials for your course."
          guidelines="Accepted formats: PDF, DOC, DOCX, XLS, XLSX, TXT. Maximum size: 10MB."
          fileType="document"
          onFileUpload={(file) => console.log("Document uploaded:", file)}
          buttonColor="secondary"
          buttonVariant="bordered"
          buttonSize="lg"
          maxFileSize={10 * 1024 * 1024}
        />
      </div>

      {/* Custom styled example */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Custom Styled Upload</h2>
        <FileUpload
          label="Upload profile picture"
          description="Add a professional photo to your profile."
          guidelines="Square images work best. Max 2MB."
          fileType="image"
          onFileUpload={(file) => console.log("Profile pic uploaded:", file)}
          buttonColor="success"
          buttonVariant="faded"
          buttonSize="sm"
          maxFileSize={2 * 1024 * 1024}
          className="border border-blue-200 rounded-lg p-4"
          customValidation={(file) => {
            if (file.type === "image/gif") {
              return "GIF files are not allowed for profile pictures.";
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default FileUploadExample;

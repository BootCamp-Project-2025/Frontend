/* import { Image } from "../atoms/Image";
import profilePictureDefault from "../../../assets/profile.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { UploadModal } from "../molecules/UploadModal";
import { useUploaderImage } from "../../hooks/useUploaderImage";

const AvatarProfile = ({ profilePicture }) => {
  const [fileState, setFileState] = useState({
    selectedFile: null,
    preview: null,
    isModalOpen: false,
    isDragOver: false,
  });

  const { uploadFile } = useUploaderImage((secureUrl) => {
    updateProfilePicture(secureUrl);
  });
  const handleFileSelect = (file) => {
  const isImage = file.type.startsWith("image/");
  if (isImage) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileState((prev) => ({
        ...prev,
        selectedFile: file,
        preview: e.target.result,
      }));

      uploadFile(file); 
    };
    reader.readAsDataURL(file);
  } else {
    setFileState((prev) => ({
      ...prev,
      selectedFile: file,
      preview: null,
    }));
  }
};
  const validProfilePicture =
    profilePicture && profilePicture.trim().length > 4 ? profilePicture : null;

  return (
    <>
      <div
        onClick={() => setFileState((prev) => ({ ...prev, isModalOpen: true }))}
      >
        <Image
          src={
            fileState.preview || validProfilePicture || profilePictureDefault
          }
          alt="profile image"
          width="w-48 2xl:w-72"
          height="h-48 2xl:h-72"
          styleType="profile"
          classname="transition duration-300 hover:brightness-50 cursor-pointer object-cover bg-[color:var(--color-secondary-500)]"
        />
      </div>

      <UploadModal
        isOpen={fileState.isModalOpen}
        onClose={() =>
          setFileState((prev) => ({
            ...prev,
            isModalOpen: false,
            selectedFile: null,
            preview: null,
            isDragOver: false,
          }))
        }
        fileType="image"
        onFileSelect={handleFileSelect}
        isDragOver={fileState.isDragOver}
        onDragOver={() =>
          setFileState((prev) => ({ ...prev, isDragOver: true }))
        }
        onDragLeave={() =>
          setFileState((prev) => ({ ...prev, isDragOver: false }))
        }
      />
    </>
  );
};

export default AvatarProfile;

AvatarProfile.propTypes = {
  profilePicture: PropTypes.string,
};
 */
/* import { Image } from "../atoms/Image";
import profilePictureDefault from "../../../assets/profile.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { UploadModal } from "../molecules/UploadModal";
import { useUploaderImage } from "../../hooks/useUploaderImage";

const AvatarProfile = ({ profilePicture, updateProfilePicture }) => {
  const [fileState, setFileState] = useState({
    selectedFile: null,
    preview: null,
    isModalOpen: false,
    isDragOver: false,
  });

  const { uploadFile } = useUploaderImage((secureUrl) => {
    updateProfilePicture(secureUrl);
    setFileState((prev) => ({
      ...prev,
      isModalOpen: false,
      isDragOver: false,
    }));
  });

  const handleFileSelect = (file) => {
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileState((prev) => ({
          ...prev,
          selectedFile: file,
          preview: e.target.result,
        }));

        uploadFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setFileState((prev) => ({
        ...prev,
        selectedFile: file,
        preview: null,
      }));
    }
  };

  const validProfilePicture =
    profilePicture && profilePicture.trim().length > 4 ? profilePicture : null;

  return (
    <>
      <div
        onClick={() => setFileState((prev) => ({ ...prev, isModalOpen: true }))}
      >
        <Image
          src={
            fileState.preview || validProfilePicture || profilePictureDefault
          }
          alt="profile image"
          width="w-48 2xl:w-72"
          height="h-48 2xl:h-72"
          styleType="profile"
          classname="transition duration-300 hover:brightness-50 cursor-pointer object-cover bg-[color:var(--color-secondary-500)]"
        />
      </div>

      <UploadModal
        isOpen={fileState.isModalOpen}
        onClose={() =>
          setFileState((prev) => ({
            ...prev,
            isModalOpen: false,
            selectedFile: null,
            preview: null,
            isDragOver: false,
          }))
        }
        fileType="image"
        onFileSelect={handleFileSelect}
        isDragOver={fileState.isDragOver}
        onDragOver={() =>
          setFileState((prev) => ({ ...prev, isDragOver: true }))
        }
        onDragLeave={() =>
          setFileState((prev) => ({ ...prev, isDragOver: false }))
        }
      />
    </>
  );
};

export default AvatarProfile;

AvatarProfile.propTypes = {
  profilePicture: PropTypes.string,
  updateProfilePicture: PropTypes.func,
};
 */
import { Image } from "../atoms/Image";
import profilePictureDefault from "../../../assets/profile.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUploader } from "../../hooks/useUploader";

const AvatarProfile = ({ profilePicture, updateProfilePicture }) => {
  const [preview, setPreview] = useState(null);

  const { openWidget } = useUploader((url) => {
    setPreview(url);
    if (updateProfilePicture) {
      updateProfilePicture(url);
    }
  });

  const validProfilePicture =
    profilePicture && profilePicture.trim().length > 4 ? profilePicture : null;

  return (
    <div onClick={openWidget}>
      <Image
        src={preview || validProfilePicture || profilePictureDefault}
        alt="profile image"
        styleType="profile"
        classname="h-40  min-w-40 w-40  min-h-40 transition duration-300 hover:brightness-50 cursor-pointer object-cover"
      />
    </div>
  );
};

export default AvatarProfile;

AvatarProfile.propTypes = {
  profilePicture: PropTypes.string,
  updateProfilePicture: PropTypes.func,
};

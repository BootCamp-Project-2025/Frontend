import { Image } from "../atoms/Image";
import profilePictureDefault from "../../../assets/profile.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { UploadModal } from "../molecules/UploadModal";

const AvatarProfile = ({ profilePicture }) => {
  const [fileState, setFileState] = useState({
    selectedFile: null,
    preview: null,
    isModalOpen: false,
    isDragOver: false,
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
      };
      reader.readAsDataURL(file);
    } else {
      setFileState((prev) => ({
        ...prev,
        selectedFile: file,
        preview: null,
      }));
    }

    // 🔁 Acá podrías llamar a un endpoint para guardar el archivo:
    // const formData = new FormData();
    // formData.append("avatar", file);
    // await fetch("/api/profile/avatar", { method: "POST", body: formData });
  };

  return (
    <>
      <div
        onClick={() => setFileState((prev) => ({ ...prev, isModalOpen: true }))}
      >
        <Image
          src={fileState.preview || profilePicture || profilePictureDefault}
          alt="profile image"
          width="w-48 2xl:w-72"
          height="h-48 2xl:h-72"
          styleType="profile"
          classname="transition duration-300 hover:brightness-50 cursor-pointer object-cover"
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

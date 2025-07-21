import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useCallback, useRef, useState } from "react";

export default function UploadVideoUrl({ closePopup, saveVideo, ...props }) {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  function isUrl(url) {
    try {
      const validUrl = new URL(url);
      if (validUrl) {
        setErrorMessage("");
        return true;
      }
      return false;
    } catch {
      setErrorMessage("its not an url");
      return false;
    }
  }

  const handleSave = useCallback(() => {
    if (!isUrl(inputRef.current.value)) {
      return;
    }
    saveVideo(inputRef.current.value);
    closePopup();
  }, [closePopup, saveVideo]);

  return (
    <div className={"flex flex-col w-64 md:w-xl gap-6 p-4"} {...props}>
      <Title className="text-center" color="black">
        Upload video url
      </Title>
      <TextInput
        label="Video url"
        errorMessage={errorMessage}
        ref={inputRef}
        placeholder="Video url"
      />
      <div className="flex justify-center gap-8 mt-2">
        <Button color="secondary" onClick={closePopup}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

UploadVideoUrl.propTypes = {
  closePopup: PropTypes.func,
  saveVideo: PropTypes.func,
};

import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useRef, useState } from "react";

export default function UploadVideoUrl({ closePopup, saveVideo, ...props }) {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  function isUrl(url) {
    try {
      new URL(url);
      setErrorMessage("");
      return true;
    } catch {
      setErrorMessage("its not an url");
      return false;
    }
  }
  return (
    <div className={`flex flex-col w-64 md:w-xl gap-6 p-4`} {...props}>
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
        <Button
          color="primary"
          onClick={() => {
            if (!isUrl(inputRef.current.value)) {
              return;
            }
            saveVideo(inputRef.current.value);
            closePopup();
          }}
        >
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

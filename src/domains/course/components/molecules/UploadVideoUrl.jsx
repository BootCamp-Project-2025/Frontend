import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useRef } from "react";

export default function UploadVideoUrl({ closePopup, saveVideo, ...props }) {
  const inputRef = useRef(null);
  return (
    <div
      className={`flex flex-col w-64 md:w-xl text-center gap-6 p-4`}
      {...props}
    >
      <Title color="black">Upload video url</Title>
      <TextInput ref={inputRef} placeholder="video url" />
      <div className="flex justify-center gap-8 mt-2">
        <Button color="secondary" onClick={closePopup}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
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

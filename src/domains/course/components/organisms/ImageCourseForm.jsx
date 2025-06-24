import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { Button } from "../../../../shared/components/atoms/Button";

export default function ImageCourseForm() {
  return (
    <div className="flex gap-4">
      <div
        style={{ minWidth: 350, minHeight: 230 }}
        className="p-4 border-1 rounded-xl flex"
      >
        <img
          className="mx-auto my-auto"
          style={{ width: 100, height: 100 }}
          src="/images/EmptyImage.svg"
          alt=""
        />
      </div>
      <div>
        <p>
          Upload your course image here. The image must meet the quality
          standards for course images. Important guidelines: 000 x 000 pixels;
          format .jpg, .jpeg, .gif, or .png.
        </p>
        <div className="flex gap-4 py-2">
          <div className="grow-1">
            <TextInput placeholder="Upload file" />
          </div>
          <div>
            <Button radius="small" variant="bordered" className="w-fit">
              <span className="material-symbols-outlined">add</span> save image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

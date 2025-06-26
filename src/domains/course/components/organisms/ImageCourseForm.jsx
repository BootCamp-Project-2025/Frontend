import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";

export default function ImageCourseForm() {
  const [image, setImage] = useState("/images/EmptyImage.svg");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex gap-4">
      <div
        style={{ minWidth: 350, minHeight: 230 }}
        className="p-4 border-1 rounded-xl flex"
      >
        <img
          className="mx-auto my-auto"
          style={{ width: 100, height: 100 }}
          src={image}
          alt="upload image"
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
            <input
              type="file"
              accept="image/*"
              id="upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <Button radius="small" variant="bordered" className="w-fit px-0 ">
              <input
                className="hidden"
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
              />
              <label className="m-0 flex" htmlFor="image">
                <span className="material-symbols-outlined">add</span>
                <span>save image</span>
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

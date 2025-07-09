import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ImageCourseForm() {
  const [image, setImage] = useState("/images/EmptyImage.svg");
  const { register, setValue } = useForm();
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setValue("imageName", event.target.files?.[0].name);
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
        <img className="mx-auto my-auto" src={image} alt="upload image" />
      </div>
      <div>
        <p>
          Upload your course image here. The image must meet the quality
          standards for course images. Important guidelines: 000 x 000 pixels;
          format .jpg, .jpeg, .gif, or .png.
        </p>
        <div className="flex gap-4 py-2">
          <TextInput
            disabled
            id={"imageName"}
            register={register("imageName", {})}
            placeholder="Upload image"
          />
          <Button radius="small" variant="bordered" className="px-0 w-max">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
            />
            <label
              className="m-0 flex gap-1 hover:cursor-pointer"
              htmlFor="image"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="w-max">save image</span>
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
}

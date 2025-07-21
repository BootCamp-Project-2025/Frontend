import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import SmallAnotation from "../atoms/SmallAnotation";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import DropdownSection from "./DropdownSection";
import { UseGet } from "../../api/UseGet";
import { UsePut } from "../../api/UsePut";
import {
  ToastProvider,
  useToastContext,
} from "../../../../shared/contexts/ToastContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileUpload } from "../../../../shared/components/organisms/FileUpload";

export default function StaticCourseHomePageForm() {
  const { courseId } = useParams();
  const { responseData, loading, error } = UseGet("courses", courseId);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const { showToast } = useToastContext();
  const [file, setFile] = useState(null);

  const selectNewCourseImage = (newFile) => {
    setFile(newFile);
  };

  const updateCourse = async (data) => {
    console.log(file);
    course.name = data.name;
    course.description = data.description;
    const { responseData, error } = await UsePut("courses", courseId, course);
    showToast(responseData.message, error ? "error" : "success");
  };

  useEffect(() => {
    if (responseData) {
      setValue("name", responseData.data.name ?? "");
      setValue("description", responseData.data.description ?? "");
    }
  }, [responseData, setValue]);

  if (loading) return <>loading</>;

  if (error) return <>data couldnt be loadedd</>;

  const course = responseData.data;

  return (
    <ToastProvider>
      <form
        onSubmit={handleSubmit(updateCourse)}
        className="flex flex-col w-full gap-4 max-w-[90rem] px-8 py-4 mx-auto"
      >
        <Title className="border-b-1" color="default">
          Home page course
        </Title>
        <section>
          <TextInput
            label={"Course name:"}
            placeholder={"Web programming basic course"}
            errorMessage={errors.name?.message}
            register={register("name", {
              required: "Course name is required",
              minLength: { value: 1, message: "Minimum 2 characters" },
              maxLength: { value: 100, message: "Maximum 100 characters" },
            })}
          />
          <SmallAnotation>
            Your course title should be clear, attention-grabbing, and optimized
            for search visibility.
          </SmallAnotation>
        </section>
        <section>
          <TextAreaInput
            label={"Description:"}
            rows={4}
            placeholder={
              "Learn how to build modern, mobile-first websites that look great on any device. This hands-on course covers HTML5, CSS3, Flexbox, and CSS Grid through real-world projects."
            }
            errorMessage={errors.description?.message}
            register={register("description", {
              required: "Course name is required",
              minLength: { value: 1, message: "Minimum 2 characters" },
              maxLength: { value: 200, message: "Maximum 200 characters" },
            })}
          />
          <SmallAnotation>
            Your course title should be clear, attention-grabbing, and optimized
            for search visibility.
          </SmallAnotation>
        </section>
        <p className="text-gray-600 font-semibold text-lg ">
          Basic information:
        </p>
        <DropdownSection course={course} />
        <p className="text-gray-600 font-semibold text-lg ">Image of course:</p>

        <FileUpload
          maxFileSize={5 * 1024 * 1024}
          initialPreview={responseData?.data?.imgSrc}
          label="Select the image for your course"
          description="Upload your course image here. The image must meet the quality standards for course images."
          guidelines="Important guidelines: 000 x 000 pixels; format .jpg, .jpeg, .gif, or .png."
          buttonVariant="ghost"
          onFileUpload={selectNewCourseImage}
        ></FileUpload>

        <Button
          type="submit"
          disabled={isSubmitting}
          isSpinning={isSubmitting}
          radius="small"
          className="w-fit self-end"
        >
          Save changes
        </Button>
      </form>
    </ToastProvider>
  );
}

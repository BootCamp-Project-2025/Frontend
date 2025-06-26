import { TextAreaInput } from "../../../../shared/components/molecules/TextAreaInput";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import SmallAnotation from "../atoms/SmallAnotation";
import { Title } from "../../../../shared/components/atoms/Title";
import ImageCourseForm from "./ImageCourseForm";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import DropdownSection from "./DropdownSection";
import { UseGet } from "../../api/useGet";
import { UsePut } from "../../api/usePut";

export default function StaticCourseHomePageForm() {
  const { data, loading, error } = UseGet(
    "courses",
    "adad9f6e-b2f8-46bc-b089-12a0511dec3f"
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  if (loading) return <>loading</>;

  if (error) return <>data couldnt be loadedd</>;

  const course = data.data;

  setValue("name", course.name);
  setValue("description", course.description);

  const updateCourse = async (data) => {
    course.name = data.name;
    course.description = data.description;
    console.log(course);
    UsePut("courses", "adad9f6e-b2f8-46bc-b089-12a0511dec3f", course);
  };
  return (
    <form
      onSubmit={handleSubmit(async (data) => await updateCourse(data))}
      style={{ padding: "0 15vw" }}
      className="flex flex-col gap-4"
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
            maxLength: { value: 100, message: "Maximum 100 characters" },
          })}
        />
        <SmallAnotation>
          Your course title should be clear, attention-grabbing, and optimized
          for search visibility.
        </SmallAnotation>
      </section>
      <p className="text-gray-600 font-semibold text-lg ">Basic information:</p>
      <DropdownSection course={course} />
      <p className="text-gray-600 font-semibold text-lg ">Image of course:</p>
      <ImageCourseForm />
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
  );
}

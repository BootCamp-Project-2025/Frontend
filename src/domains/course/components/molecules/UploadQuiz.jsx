import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { useForm } from "react-hook-form";

export default function UploadQuiz({
  closePopup,
  dispatch,
  moduleIndex,
  ...props
}) {
  function isUrl(url) {
    try {
      const validUrl = new URL(url);
      if (validUrl) {
        return true;
      }
    } catch {
      return false;
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch({
          type: "ADD_QUIZ",
          url: data.quizUrl,
          name: data.name,
          moduleIndex,
        });
        closePopup();
      })}
      className={"flex flex-col w-64 md:w-xl gap-6 p-4"}
      {...props}
    >
      <Title className="text-center" color="black">
        Upload quiz url
      </Title>
      <TextInput
        id={"name"}
        {...register("name", {
          required: "A name is required",
          minLength: { value: 5, message: "At least 3 letter" },
          maxLength: { value: 50, message: "Maximum 50 letters" },
        })}
        label="Name"
        errorMessage={errors?.name?.message}
        placeholder="Name"
      />
      <TextInput
        id={"quizUrl"}
        {...register("quizUrl", {
          required: "A valid url is required",
          validate: (value) => isUrl(value),
        })}
        label="Quiz url"
        errorMessage={errors?.quizUrl?.message}
        placeholder="Quiz url"
      />
      <div className="flex justify-center gap-8 mt-2">
        <Button color="secondary" onClick={closePopup}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </div>
    </form>
  );
}

UploadQuiz.propTypes = {
  closePopup: PropTypes.func,
  dispatch: PropTypes.func,
  moduleIndex: PropTypes.number,
};

import { useCallback, useRef, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { TextEditor } from "../../../../shared/components/molecules/TextEditor";
import { useForm } from "react-hook-form";
import { isAvalidateUrl } from "../../utils/Validations";

/**
 *
 * @param {*} saveOrEdit Function that is executed on submit of the form. Can be a save function to create an new post or a edit function to update an alredy existing post
 * @param {*} closePopup Function to close the pop up that the form was design for
 * @param {*} post Data of the post. Optional field, passed only if you intent to edit a post
 * @returns
 */
export default function PostForm({ saveOrEdit, closePopup, post }) {
  const description = useRef(post.description ? post.description : "");
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post ? post.title : "",
      url: post ? post.url : "",
    },
  });

  const cleanDescription = useCallback((descriptionToClean) => {
    return descriptionToClean.replaceAll(/<[^>]*>/g, "").trim();
  }, []);

  const createPost = useCallback(
    (newData) => {
      const newPost = post ? { ...post } : {};
      if (cleanDescription(description.current)) {
        newPost.description = description.current;
      }
      if (newData.url) {
        newPost.url = newData.url;
      }
      newPost.title = newData.title;
      return newPost;
    },
    [cleanDescription, post]
  );

  const handleSave = useCallback(
    (data) => {
      if (descriptionError) {
        return;
      }
      if (!cleanDescription(description.current) && !data.url) {
        setError("A description or resource is needed");
        return;
      }

      const postToSave = createPost({
        ...data,
        description: description.current,
      });
      const completeData = { ...postToSave, creationDate: new Date() };
      saveOrEdit(completeData, "posts");
      closePopup();
    },
    [descriptionError, cleanDescription, createPost, saveOrEdit, closePopup]
  );

  const validateDescriptionLength = useCallback((descriptionToValidate) => {
    if (descriptionToValidate.length === 0) {
      setDescriptionError("");
      return;
    }
    if (descriptionToValidate.length < 10) {
      setDescriptionError("Description should be more than 10 characters");
      return;
    }
    if (descriptionToValidate.length > 1000) {
      setDescriptionError("Description to long");
      return;
    }
    setDescriptionError("");
  }, []);

  const handleOnChangeDescription = useCallback(
    (e) => {
      description.current = e.trim();
      const cleanedDescription = description.current
        .replaceAll(/<[^>]*>/g, "")
        .trim();

      setError("");
      validateDescriptionLength(cleanedDescription);
    },
    [validateDescriptionLength]
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col w-2xl p-5 gap-5"
      >
        <Title className="text-center" color="default">
          Post
        </Title>
        <TextInput
          id="title"
          placeholder="Add a title to the post"
          label="Title:"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title should be more than 5 characters",
            },
            maxLength: {
              value: 50,
              message: "Title should be less than 100 characters",
            },
          })}
          errorMessage={errors.title?.message}
        />

        <div className="textEditor">
          <Title size="sm" color="default">
            Description:
          </Title>
          <TextEditor
            placeholder="Enter a description"
            value={description.current}
            onChange={handleOnChangeDescription}
          />
          <p className="text-sm  text-pink-500">{descriptionError}</p>
        </div>

        <TextInput
          id="url"
          placeholder="Add an aditional link"
          label="Resources:"
          {...register("url", {
            validate: (value) => {
              if (isAvalidateUrl(value) || value === "") {
                return true;
              }
              return "Not a valid url";
            },
          })}
          errorMessage={errors.url?.message}
        />

        <p className="text-sm  text-pink-500">{error}</p>
        <div className="flex justify-center gap-5">
          <Button color="secondary" variant="bordered" onClick={closePopup}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  saveOrEdit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

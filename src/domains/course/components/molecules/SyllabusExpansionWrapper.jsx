import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Button } from "../../../../shared/components/atoms/Button";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../../../../shared/components/molecules/TextInput";

export default function SyllabusExpansionWrapper({
  saveTitle,
  save,
  erase,
  enableSave = false,
  newSection = false,
  borderTitle = true,
  sectionTitle = "",
  title = "",
  children,
  className = "",
  ...props
}) {
  const [displayChild, setDisplayChild] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [editTitle]);

  function validateTitle(e) {
    if (e.target.value.length > 20) {
      setError("Title cannot exceed 20 characters");
      return false;
    } else if (e.target.value.length < 5) {
      setError("Title cannot be less than 5 characters");
      return false;
    }
    setError("");
    return true;
  }

  function enableEdit() {
    if (!editTitle) {
      inputRef.current.value = title;
    }
    setEditTitle(!editTitle);
  }
  return (
    <div className={`py-2 ${className}`}>
      <div
        className={`flex items-center justify-between my-2 py-1 ${borderTitle ? "border-b-1" : ""} `}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Title color="black">{`${sectionTitle}:`}</Title>
          <div className={`${editTitle ? "" : "hidden"}`}>
            <TextInput
              ref={inputRef}
              id={sectionTitle}
              type="text"
              className={`min-w-8 overflow-ellipsis max-w-min focus:outline-none mx-0 px-3`}
              errorMessage={error}
              onChange={validateTitle}
            />
          </div>

          <span
            className={`ml-4 font-medium mx-1 ${editTitle ? "hidden" : ""}`}
          >
            {title}
          </span>
          <span className={`${newSection ? "" : "hidden"} text-blue-500`}>
            new
          </span>

          {editTitle ? (
            <Button
              onClick={() => {
                if (error) return;
                saveTitle(inputRef.current.value);
                enableEdit();
              }}
              variant="light"
              color="secondary"
            >
              <Icon className={"fill-black w-4 h-4"} icon={"save"} />
            </Button>
          ) : (
            <Button onClick={enableEdit} variant="light" color="secondary">
              <Icon className={"w-4 h-4"} icon={"editBlack"} />
            </Button>
          )}
        </div>
        <div>
          <Button
            onClick={save}
            color="secondary"
            className={`px-5 bg-blue-500 ${enableSave || newSection ? "" : "hidden"}`}
          >
            <Icon className={`fill-white w-4 h-4`} icon={"save"} />
          </Button>
          <Button
            onClick={erase}
            variant="light"
            color="secondary"
            className={`px-5 `}
          >
            <Icon icon={"trashCan"} />
          </Button>
          <Button
            onClick={() => setDisplayChild((display) => !display)}
            variant="light"
            color="secondary"
            className={"px-5"}
          >
            <Icon
              className={"w-4"}
              icon={`${displayChild ? "vectorUp" : "vectorDown"}`}
            />
          </Button>
        </div>
      </div>
      <section className={`${displayChild ? "" : "hidden"}`}>
        {children}
      </section>
    </div>
  );
}

SyllabusExpansionWrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  sectionTitle: PropTypes.string,
  children: PropTypes.element,
  save: PropTypes.func,
  saveTitle: PropTypes.func,
  erase: PropTypes.func,
  borderTitle: PropTypes.bool,
  enableSave: PropTypes.bool,
  newSection: PropTypes.bool,
};

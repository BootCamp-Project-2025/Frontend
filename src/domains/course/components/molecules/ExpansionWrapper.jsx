import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Button } from "../../../../shared/components/atoms/Button";
import { useRef, useState } from "react";

export default function ExpansionWrapper({
  sectionTitle = "",
  saveTitle,
  save,
  enableSave = false,
  erase,
  title = "",
  children,
  className = "",
  borderTitle = true,
  ...props
}) {
  const [displayChild, setDisplayChild] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const inputRef = useRef(null);
  function enableEdit() {
    if (!editTitle) {
      inputRef.current.value = title;
    }
    setEditTitle(!editTitle);
  }
  return (
    <div className={`py-2 ${className}`}>
      <div
        className={`flex items-center justify-between my-2 ${borderTitle ? "border-b-1" : ""} `}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Title color="black">{`${sectionTitle}:`}</Title>
          <input
            ref={inputRef}
            id={sectionTitle}
            type="text"
            className={`min-w-8 overflow-ellipsis max-w-min focus:outline-none mx-0 px-3 ${editTitle ? "" : "hidden"}`}
          />
          <span
            className={`ml-4 font-medium mx-1 ${editTitle ? "hidden" : ""}`}
          >
            {title}
          </span>

          {editTitle ? (
            <Button
              onClick={() => {
                saveTitle(inputRef.current.value);
                enableEdit();
              }}
              variant="light"
              color="secondary"
            >
              <Icon className={"w-4 h-4"} icon={"save"} />
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
            variant="light"
            color="secondary"
            className={`px-5 border-2 border-blue-500 ${enableSave ? "" : "hidden"}`}
          >
            <Icon className={`w-4 h-4`} icon={"save"} />
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

ExpansionWrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  sectionTitle: PropTypes.string,
  children: PropTypes.element,
  borderTitle: PropTypes.bool,
  enableSave: PropTypes.bool,
  save: PropTypes.func,
  saveTitle: PropTypes.func,
  erase: PropTypes.func,
};

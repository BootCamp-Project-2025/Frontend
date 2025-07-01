import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Button } from "../../../../shared/components/atoms/Button";
import { useState } from "react";

export default function ExpansionWrapper({
  sectionTitle = "",
  title = "",
  children,
  className = "",
  borderTitle = true,
  ...props
}) {
  const [displayChild, setDisplayChild] = useState(true);
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center justify-between my-2 ${borderTitle ? "border-b-1" : ""} `}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Title color="black">
            {`${sectionTitle}:`}
            <span className="ml-4 font-medium">{title}</span>
          </Title>
          <Button variant="light" color="secondary">
            <Icon icon={"editBlack"} />
          </Button>
        </div>
        <div>
          <Button variant="light" color="secondary" className={"px-5"}>
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
              icon={`${displayChild ? "vectorDown" : "vectorUp"}`}
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
};

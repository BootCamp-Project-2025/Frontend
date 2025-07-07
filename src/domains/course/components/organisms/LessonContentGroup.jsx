import { Title } from "../../../../shared/components/atoms/Title";
import LessonContentRow from "../atoms/LessonContentRow";
import PropTypes from "prop-types";

export default function LessonContentGroup({
  eraseResource,
  title,
  resources,
  className,
  ...props
}) {
  return (
    <div className={`px-5 py-3 mt-2 mx-16 ${className}`} {...props}>
      <Title color="black">{title}</Title>
      <div className="px-2">
        {resources.map((resource, id) => (
          <LessonContentRow
            eraseResource={eraseResource}
            key={id}
            name={resource.name}
            link={resource.link}
            resourcePosition={id}
          />
        ))}
      </div>
    </div>
  );
}

LessonContentGroup.propTypes = {
  title: PropTypes.string,
  eraseResource: PropTypes.func,
  resources: PropTypes.object,
  className: PropTypes.string,
};

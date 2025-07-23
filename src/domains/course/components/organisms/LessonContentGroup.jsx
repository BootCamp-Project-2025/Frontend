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
      <ul className="px-2">
        {resources.map((resource) => (
          <LessonContentRow
            eraseResource={eraseResource}
            key={resource.name ?? resource}
            name={resource.name ?? resource}
            url={resource.url ?? resource}
          />
        ))}
      </ul>
    </div>
  );
}

LessonContentGroup.propTypes = {
  title: PropTypes.string,
  eraseResource: PropTypes.func,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

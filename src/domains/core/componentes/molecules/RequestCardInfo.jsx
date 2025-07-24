import { Title } from "../../../../shared/components/atoms/Title";
import PropTypes from "prop-types";

export default function RequestCardInfo({
  title,
  details,
  description,
  ...props
}) {
  return (
    <div {...props}>
      <Title color="black" size="md">
        {title}
      </Title>
      <span className="text-gray-700 font-semibold">{details}</span>
      <p>{description}</p>
    </div>
  );
}

RequestCardInfo.propTypes = {
  title: PropTypes.node,
  details: PropTypes.node,
  description: PropTypes.node,
};

import { Title } from "../../../../shared/components/atoms/Title";
import PropTypes from "prop-types";

export default function RequestCardInfo({ title, description, ...props }) {
  return (
    <div {...props} className="flex flex-col gap-8">
      <Title color="black" size="md">
        {title}
      </Title>
      <p>{description}</p>
    </div>
  );
}

RequestCardInfo.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
};

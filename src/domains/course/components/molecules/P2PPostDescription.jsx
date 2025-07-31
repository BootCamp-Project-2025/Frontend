import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";

/**
 * If there is no text, it returns an empty fragment
 */
export default function P2PPostDescription({ text }) {
  if (!text) {
    return <></>;
  }
  return (
    <div className="p-2">
      <Title color="default" size="md">
        Description
      </Title>
      <p className="p-1">{text}</p>
    </div>
  );
}

P2PPostDescription.propTypes = {
  text: PropTypes.string,
};

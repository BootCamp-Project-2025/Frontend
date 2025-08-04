import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import DOMPurify from "dompurify";

/**
 * If there is no text, it returns an empty fragment
 */
export default function P2PPostDescription({ text }) {
  const sanitizedContent = DOMPurify.sanitize(text);
  if (!text) {
    return <></>;
  }
  return (
    <div className="p-2">
      <Title color="default" size="md">
        Description
      </Title>
      <div
        className="p-1"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}

P2PPostDescription.propTypes = {
  text: PropTypes.string,
};

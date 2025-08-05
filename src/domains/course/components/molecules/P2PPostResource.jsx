import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";

export default function P2PPostResource({ url }) {
  if (!url) {
    return <></>;
  }
  return (
    <div className="p-2">
      <Title color="default" size="md">
        Resource
      </Title>
      <a
        className="text-blue-500 p-1"
        target="_blank"
        rel="noreferrer"
        href={url}
      >
        {url}
      </a>
    </div>
  );
}

P2PPostResource.propTypes = {
  url: PropTypes.string.isRequired,
};

import { Title } from "../../../../shared/components/atoms/Title";
import PropTypes from "prop-types";
import P2PCardButtons from "./P2PCardButtons";
import { useCallback } from "react";

export default function P2PFileCard({ filePost, erase }) {
  const lastSlashIndex = filePost.url.lastIndexOf("/");
  const name = filePost.url.slice(lastSlashIndex + 1);

  const handleErase = useCallback(() => {
    erase("FILE", filePost.id);
  }, [erase, filePost.id]);

  return (
    <div className="p2pCard-template p2pCard-shadow-default">
      <div className="flex justify-between">
        <Title size="md">
          <a href={filePost.url} target="_blank" rel="noreferrer">
            {name}
          </a>
        </Title>
        <P2PCardButtons erase={erase ? handleErase : undefined} />
      </div>
      <embed className="min-h-[400px]" src={filePost.url} />
    </div>
  );
}

P2PFileCard.propTypes = {
  filePost: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  erase: PropTypes.func,
};

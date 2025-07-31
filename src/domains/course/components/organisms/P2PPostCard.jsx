import { Title } from "../../../../shared/components/atoms/Title";
import P2PPostDescription from "../molecules/P2PPostDescription";
import P2PPostResource from "../molecules/P2PPostResource";
import P2PCardButtons from "../molecules/P2PCardButtons";
import { useCallback } from "react";
import PropTypes from "prop-types";

/**
 * @param {*} post Data of the post
 * @param {*} edit Edit function in format edit(type, data)
 * @param {*} erase Erase function in format erase(type, id)
 */
export default function P2PPostCard({ post, edit, erase }) {
  const handleEdit = useCallback(() => {
    edit("POST", post);
  }, [edit, post]);

  const handleErase = useCallback(() => {
    erase("POST", post.id);
  }, [erase, post.id]);

  return (
    <div className="p2pCard-template p2pCard-shadow-default">
      <div className="flex justify-between">
        <Title color="default">{post.title}</Title>
        <P2PCardButtons
          edit={edit ? handleEdit : undefined}
          erase={erase ? handleErase : undefined}
        />
      </div>
      <P2PPostDescription text={post.description} />
      <P2PPostResource url={post.url} />
    </div>
  );
}

P2PPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  edit: PropTypes.func,
  erase: PropTypes.func,
};

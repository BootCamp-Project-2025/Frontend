import { Title } from "../../../../shared/components/atoms/Title";
import P2PPostDescription from "../molecules/P2PPostDescription";
import P2PPostResource from "../molecules/P2PPostResource";
import P2PCardButtons from "../molecules/P2PCardButtons";
import { useCallback } from "react";
import usePopup from "../../../../shared/hooks/usePopup";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";

/**
 *
 * @param {*} post Data of the post
 * @param {*} edit Edit function in format edit(type, data)
 * @param {*} erase Erase function in format erase(type, id)
 */
export default function P2PPostCard({ post, edit, erase }) {
  const { openPopup, closePopup } = usePopup();

  const handleEdit = useCallback(() => {
    openPopup(PostForm, { closePopup, saveOrEdit: edit, post }, false);
  }, [openPopup, closePopup, edit, post]);

  const deleteAction = useCallback(
    (id) => {
      erase("POST", id);
    },
    [erase]
  );

  const handleErase = useCallback(() => {
    openPopup(
      DeleteCardPopup,
      { closePopup, deleteAction: deleteAction, id: post.id },
      true
    );
  }, [openPopup, closePopup, deleteAction, post.id]);

  return (
    <div className="p2pCard-template p2pCard-shadow-default">
      <P2PCardButtons edit={handleEdit} erase={handleErase} />
      <Title color="default">{post.title}</Title>
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

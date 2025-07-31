import { Outlet } from "react-router-dom";
import P2PNavbar from "../molecules/P2PNavbar";
import PropTypes from "prop-types";

export default function P2PContentSection({
  postList,
  filePostList,
  edit,
  save,
  erase,
}) {
  return (
    <div className="px-4">
      <P2PNavbar save={save} />
      <Outlet context={{ postList, filePostList, erase, edit }} />
    </div>
  );
}

P2PContentSection.propTypes = {
  postList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      creationDate: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  filePostList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      creationDate: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  edit: PropTypes.func,
  erase: PropTypes.func,
  save: PropTypes.func,
};

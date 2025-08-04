import { useOutletContext } from "react-router-dom";
import P2PPostCard from "./P2PPostCard";

export default function P2PPostList() {
  const { postList, edit, erase } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      {postList.length === 0 ? (
        <div className={"p2pCard-template p2pCard-shadow-default"}>
          No content yet
        </div>
      ) : (
        <></>
      )}
      {postList.map((post) => (
        <P2PPostCard key={post.id} post={post} edit={edit} erase={erase} />
      ))}
    </div>
  );
}

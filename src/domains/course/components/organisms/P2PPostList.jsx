import { useOutletContext } from "react-router-dom";
import P2PPostCard from "./P2PPostCard";
import { Alert } from "../../../../shared/components/molecules/Alert";

export default function P2PPostList() {
  const { postList, edit, erase } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      {postList.length === 0 ? (
        <Alert type="info" title="No post published" />
      ) : (
        <></>
      )}
      {postList.map((post) => (
        <P2PPostCard key={post.id} post={post} edit={edit} erase={erase} />
      ))}
    </div>
  );
}

import { useOutletContext } from "react-router-dom";
import P2PFileCard from "../molecules/P2PFileCard";
export default function P2PFilesList() {
  const { filePostList, erase } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      {filePostList.length === 0 ? (
        <div className={`p2pCard-template p2pCard-shadow-default`}>
          No Files yet
        </div>
      ) : (
        <></>
      )}
      {filePostList.map((filePost) => (
        <P2PFileCard key={filePost.id} filePost={filePost} erase={erase} />
      ))}
    </div>
  );
}

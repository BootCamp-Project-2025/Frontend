import { useOutletContext } from "react-router-dom";
import P2PFileCard from "../molecules/P2PFileCard";
import { Alert } from "../../../../shared/components/molecules/Alert";
export default function P2PFilesList() {
  const { filePostList, erase } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      {filePostList.length === 0 ? (
        <Alert type="info" title="No files uploaded" />
      ) : (
        <></>
      )}
      {filePostList.map((filePost) => (
        <P2PFileCard key={filePost.id} filePost={filePost} erase={erase} />
      ))}
    </div>
  );
}

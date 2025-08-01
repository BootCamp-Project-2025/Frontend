import { useCallback, useEffect, useRef, useState } from "react";
import { getRequest } from "../../../../shared/api/getRequest";
import SearchBar from "../../../../shared/components/molecules/SearchBar";
import { Alert } from "../../../../shared/components/molecules/Alert";
import ProposalCard from "../molecules/ProposalCard";

const mock = [
  {
    title: "Proposal 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "NEW",
    chatId: "s13783082390849023849",
  },
  {
    title: "Proposal 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "REJECTED",
    chatId: "s13783082390849023849",
  },
  {
    title: "Proposal 3",
    description: "ndsjknfjkd dsfdlsk sajfn",
    status: "ACCEPTED",
    chatId: "s13783082390849023849",
  },
];
const TeacherProposals = () => {
  const [proposalList, setProposalList] = useState(mock);
  const inputRef = useRef(null);

  const loadData = useCallback(async (title = "") => {
    const response = await getRequest(
      `/proposals/validUserRequests?title=${title}`
    );
    if (response.success) {
      setProposalList(response.data.data);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const search = useCallback(() => {
    loadData(inputRef.current.value);
  }, [loadData]);

  return (
    <div className="wrapper max-w-[90rem] w-full px-8 py-4 mx-auto flex flex-col gap-8">
      <SearchBar seach={search} ref={inputRef} placeholder="Find by title" />
      {proposalList.length === 0 ? (
        <Alert
          type="info"
          title="No proposals have been submitted yet"
          description="Search requests to make a proposal."
        />
      ) : (
        <div className="flex flex-col">
          {proposalList.map((proposal, index) => (
            <ProposalCard proposal={proposal} key={index} />
          ))}
        </div>
      )}
      {proposalList.length === 0 && inputRef && (
        <Alert
          type="error"
          title="No proposals found"
          description="You dont have a proposal with that name"
        />
      )}
    </div>
  );
};

export default TeacherProposals;

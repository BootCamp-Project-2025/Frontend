import { useEffect, useRef, useState } from "react";
import { getRequest } from "../../../../shared/api/getRequest";
import SearchBar from "../../../../shared/components/molecules/SearchBar";
import { Alert } from "../../../../shared/components/molecules/Alert";
import ProposalCard from "../molecules/ProposalCard";
import { useAuth } from "../../../../shared/hooks/useAuth";

const TeacherProposals = () => {
  const [proposalList, setProposalList] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const inputRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProposals = async () => {
      try {
        const response = await getRequest(`proposals/users/${user.id}`);
        const proposals = response.data.data;

        // Enriquecer cada propuesta con el título de la request
        const enrichedProposals = await Promise.all(
          proposals.map(async (proposal) => {
            const reqRes = await getRequest(`requests/${proposal.requestId}`);
            return { ...proposal, requestTitle: reqRes.data.data.title };
          })
        );

        setProposalList(enrichedProposals);
        setFilteredProposals(enrichedProposals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProposals();
  }, [user]);

  const handleSearch = () => {
    const query = inputRef.current.value.toLowerCase();
    const filtered = proposalList.filter((proposal) =>
      proposal.requestTitle.toLowerCase().includes(query)
    );
    setFilteredProposals(filtered);
  };

  return (
    <div className="wrapper max-w-[90rem] w-full px-8 py-4 mx-auto flex flex-col gap-8">
      <SearchBar
        seach={handleSearch}
        ref={inputRef}
        placeholder="Find by title"
      />

      {filteredProposals.length === 0 ? (
        <Alert
          type="info"
          title="No proposals found"
          description="You don’t have a proposal with that name"
        />
      ) : (
        <div className="flex flex-col">
          {filteredProposals.map((proposal, index) => (
            <ProposalCard proposal={proposal} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherProposals;

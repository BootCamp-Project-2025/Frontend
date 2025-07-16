import { useState, useEffect } from "react";
import RequestCard from "../molecules/RequestCard";
import { Searcher } from "../../../../shared/components/molecules/Searcher";
import { Filters } from "../organism/Filters";
import { Pagination } from "../../../../shared/components/molecules/Pagination";

export const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const activeFilters = ["category", "subcategory", "language"];
  useEffect(() => {
    fetch("/requestRequests.json")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error loading requests:", err));
  }, []);

  return (
    <div className="p-12 flex flex-col gap-2 justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Students requests</h1>
      <Searcher placeholder="Search requests just for you" />
      <Filters activeFilters={activeFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
      <Pagination
        backwardFn={() => {}}
        forwardFn={() => {}}
        selectedFn={() => {}}
        indexedDB={[1, 2, 3]}
      />
    </div>
  );
};

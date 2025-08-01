import { useState, useEffect } from "react";
import { Searcher } from "../../../shared/components/molecules/Searcher";
import { Filters } from "../../core/componentes/organism/Filters";
import { Pagination } from "../../../shared/components/molecules/Pagination";
import RequestCard from "../components/molecules/RequestCard";

export const SearchRequestPage = () => {
  const ofset = 8;
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [requestsData, setRequestsData] = useState([]);
  const activeFilters = ["category", "subcategory", "language"];
  useEffect(() => {
    fetch("/requestRequests.json")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setRequestsData(data.slice(0, ofset));
      })
      .catch((err) => console.error("Error loading requests:", err));
  }, []);

  const handleBackward = () => {
    handleSelected(page != 1 ? page - 1 : page);
  };
  const handleForward = () => {
    handleSelected(page != handleIndexedDB().length ? page + 1 : page);
  };
  const handleSelected = (pageSelected) => {
    setPage(pageSelected);
    setRequestsData(
      requests.slice((pageSelected - 1) * 8, ofset * pageSelected)
    );
  };
  const handleIndexedDB = () => {
    const length =
      requests.length % 8 === 0 ? requests.length / 8 : requests.length / 8 + 1;
    const indexsNavigation = Array.from({ length: length }, (_, i) => i + 1);
    return indexsNavigation;
  };

  return (
    <div className="p-12 flex flex-col gap-2 justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Students requests</h1>
      <Searcher placeholder="Search requests just for you" />
      <Filters activeFilters={activeFilters} resultQuantity={requests.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {requestsData.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
      {requests.length >= 8 && (
        <Pagination
          backwardFn={handleBackward}
          forwardFn={handleForward}
          selectedFn={handleSelected}
          indexedDB={handleIndexedDB()}
          page={page}
        />
      )}
    </div>
  );
};

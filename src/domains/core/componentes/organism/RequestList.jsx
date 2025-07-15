import { useState, useEffect } from "react";
import RequestCard from "../molecules/RequestCard";
import RequestSearchBar from "../molecules/RequestSearchBar";

export const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/requestRequests.json")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error loading requests:", err));
  }, []);

  return (
    <div className="p-12 flex flex-col gap-2 ">
      <RequestSearchBar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

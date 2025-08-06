import RequestDetailHeader from "../molecules/RequestDetailHeader";
import { Title } from "../../../../shared/components/atoms/Title";
import RequestDetailCategory from "../atoms/RequestDetailCategory";
import { useEffect, useState, useCallback } from "react";
import RequestMessageCard from "../molecules/RequestMessageCard";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { useParams } from "react-router-dom";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { useAuth } from "../../../../shared/hooks/useAuth";
import {
  fetchProposalsWithDetails,
  fetchRequestById,
} from "../../../../shared/api/fetchRequestById";
import { fetchUserById } from "../../../../shared/api/fetchUserById";

const RequestDetail = () => {
  const [proposals, setProposals] = useState([]);
  const [request, setRequest] = useState(null);
  const [userRequest, setUserRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const requestData = await fetchRequestById(params.requestId);
      setRequest(requestData);

      const userRes = await fetchUserById(requestData.userId);
      setUserRequest(userRes);

      const proposals = requestData.proposals?.length
        ? await fetchProposalsWithDetails(requestData.proposals)
        : [];

      setProposals(proposals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.requestId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  return (
    <div className="wrapper flex flex-col gap-4 px-24 pb-16">
      <RequestDetailHeader
        request={{ ...request, id: params.requestId }}
        userName={userRequest?.userName || ""}
      />
      <div className="flex gap-4">
        <RequestDetailCategory category={request.category} />
        {request.subCategory !== "none" && (
          <RequestDetailCategory category={request.subCategory} />
        )}
      </div>

      <div className="mt-4">
        <Title size="lg" color="default">
          Description
        </Title>
        <p>{request.description}</p>
        <div className="flex flex-col gap-4 mt-4">
          {user?.id === request.userId && (
            <Title size="lg" color="default">
              Messages
            </Title>
          )}
          {request.userId !== user?.id ? null : proposals.length === 0 ? (
            <Alert type="info" title="Your request has no messages yet" />
          ) : (
            proposals.map((proposal, index) => (
              <RequestMessageCard proposal={proposal} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

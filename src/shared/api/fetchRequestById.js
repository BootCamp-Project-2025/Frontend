import { getRequest } from "./getRequest";
import { fetchUserById } from "./fetchUserById";
import { fetchLastMessage } from "./fetchLastMessage";

export const fetchRequestById = async (requestId) => {
  const response = await getRequest(`requests/${requestId}`);
  return response.data.data;
};

export const fetchProposalsWithDetails = async (proposals) => {
  return Promise.all(
    proposals.map(async (proposal) => {
      const user = await fetchUserById(proposal.userId);
      const lastMessage = await fetchLastMessage(proposal.chatId);

      return {
        ...proposal,
        userName: user.userName,
        profilePicture: user.profilePicture,
        lastMessage,
      };
    })
  );
};

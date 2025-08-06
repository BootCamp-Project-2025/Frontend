import { getRequest } from "./getRequest";

export const fetchLastMessage = async (chatId) => {
  if (!chatId) return "No messages yet";

  const response = await getRequest(`chats/${chatId}/messages`);
  const messages = response?.data?.data ?? [];

  return messages.length > 0
    ? messages[messages.length - 1].content
    : "No messages yet";
};

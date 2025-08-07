export const formatInitialP2P = (chat, userId, proposal, newChatId) => {
  return {
    studentId: userId,
    teacherId: chat.participantsIds.filter((p) => p != userId)[0],
    chatId: newChatId,
    // TODO add endpoint to get request information
    name: chat.name,
    remainingSession: proposal.sessions.length,
    status: "ACTIVE",
    posts: [],
    files: [],
    sessions: proposal.sessions.map((session) => {
      return {
        url: "http://example.com",
        dateOfTheSession: session.datetime,
        creationDate: proposal.createdAt,
        status: "PENDING",
      };
    }),
  };
};

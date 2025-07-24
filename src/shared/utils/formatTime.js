export const formatTime = (timestamp) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

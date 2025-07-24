export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return "Today";
  } else if (isSameDay(date, yesterday)) {
    return "Yesterday";
  } else if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
    });
  } else {
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }
};

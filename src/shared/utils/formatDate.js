export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
  }).format(date);
};

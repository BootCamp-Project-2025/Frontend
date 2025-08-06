export const getStatusColor = (status) => {
  if (status === "ACCEPTED") return "var(--color-success-500)";
  if (status === "REJECTED") return "var(--color-danger-500)";
  if (["NEW", "SENT"].includes(status)) return "var(--color-warning-500)";
  return "var(--color-secondary-500)";
};

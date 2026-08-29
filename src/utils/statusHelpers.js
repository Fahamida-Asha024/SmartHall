export const getStatusLabel = (status) => {
  const labels = {
    pending: "Pending",
    assigned: "Assigned",
    in_progress: "In Progress",
    completed: "Completed",
    resolved: "Resolved",
    reopened: "Reopened",
  };

  return labels[status] || status;
};
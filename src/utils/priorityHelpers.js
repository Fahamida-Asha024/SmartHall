export const getPriorityLabel = (priority) => {
  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  };

  return labels[priority] || priority;
};
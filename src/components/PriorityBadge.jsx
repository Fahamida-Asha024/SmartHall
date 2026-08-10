const styles = {
  Low: "bg-gray-50 text-gray-400 ring-1 ring-gray-100",
  Medium: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
  High: "bg-orange-50 text-orange-600 ring-1 ring-orange-100",
  Emergency: "bg-red-50 text-red-600 ring-1 ring-red-100",
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${styles[priority] || styles.Low}`}>
      {priority === "Emergency" && "● "}{priority}
    </span>
  );
}
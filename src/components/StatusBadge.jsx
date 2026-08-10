const styles = {
  Submitted: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
  "Under Review": "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  "In Progress": "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
  Resolved: "bg-teal-50 text-teal-600 ring-1 ring-teal-100",
  Rejected: "bg-red-50 text-red-500 ring-1 ring-red-100",
  Closed: "bg-gray-50 text-gray-400 ring-1 ring-gray-100",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${styles[status] || styles.Closed}`}>
      {status}
    </span>
  );
}
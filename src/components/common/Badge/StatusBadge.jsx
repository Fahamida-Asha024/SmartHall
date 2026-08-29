import React from "react";

const STATUS_STYLES = {
  Submitted: "bg-slate-100 text-slate-600",
  "Under Review": "bg-amber-100 text-amber-700",
  Assigned: "bg-sky-100 text-sky-700",
  "In Progress": "bg-indigo-100 text-indigo-700",
  Resolved: "bg-emerald-100 text-emerald-700",
  Closed: "bg-slate-200 text-slate-600",
  Reopened: "bg-rose-100 text-rose-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
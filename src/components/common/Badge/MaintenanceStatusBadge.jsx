import React from "react";

const MAINTENANCE_STYLES = {
  Assigned: "bg-sky-100 text-sky-700",
  Accepted: "bg-indigo-100 text-indigo-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "On Hold": "bg-slate-200 text-slate-600",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function MaintenanceStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${MAINTENANCE_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
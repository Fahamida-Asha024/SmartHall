import React from "react";

const PRIORITY_STYLES = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-orange-100 text-orange-700",
  Emergency: "bg-rose-100 text-rose-700",
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[priority] || "bg-slate-100 text-slate-600"}`}>
      {priority}
    </span>
  );
}
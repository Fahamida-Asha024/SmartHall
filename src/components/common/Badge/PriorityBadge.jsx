import React from "react";

const PRIORITY_COLORS = {
  Low: "bg-slate-400",
  Medium: "bg-amber-500",
  High: "bg-orange-500",
  Emergency: "bg-rose-600",
};

const PRIORITY_TEXT = {
  Low: "text-slate-500",
  Medium: "text-amber-600",
  High: "text-orange-600",
  Emergency: "text-rose-600",
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${PRIORITY_TEXT[priority] || "text-slate-500"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_COLORS[priority] || "bg-slate-400"}`} />
      {priority}
    </span>
  );
}
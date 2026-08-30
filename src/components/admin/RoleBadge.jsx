import React from "react";

const ROLE_STYLES = {
  Student: "bg-indigo-100 text-indigo-700",
  "Hall Authority": "bg-sky-100 text-sky-700",
  "Maintenance Staff": "bg-amber-100 text-amber-700",
  Admin: "bg-slate-200 text-slate-700",
};

export default function RoleBadge({ role }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role] || "bg-slate-100 text-slate-600"}`}>
      {role}
    </span>
  );
}
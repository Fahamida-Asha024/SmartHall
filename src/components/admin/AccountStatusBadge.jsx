import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AccountStatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium
        ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}
    >
      {isActive ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {status}
    </span>
  );
}
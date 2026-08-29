import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  message = "There's no data to show right now.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <p className="max-w-xs text-sm text-slate-400">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
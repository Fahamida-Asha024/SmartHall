import React from "react";
import { CheckCircle2 } from "lucide-react";

// events = [{ event: "Complaint submitted", user: "Rafiul Islam", timestamp: "...", note: "optional" }]
export default function Timeline({ events = [] }) {
  return (
    <div className="space-y-0">
      {events.map((e, idx) => (
        <div key={idx} className="relative flex gap-3 pb-6 last:pb-0">
          {idx !== events.length - 1 && (
            <span className="absolute left-[11px] top-6 h-full w-px bg-slate-200" />
          )}
          <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{e.event}</p>
            <p className="text-xs text-slate-400">
              {e.user} • {new Date(e.timestamp).toLocaleString()}
            </p>
            {e.note && <p className="mt-1 text-sm text-slate-600">{e.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
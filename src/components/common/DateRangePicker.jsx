import React from "react";
import { Calendar } from "lucide-react";

export default function DateRangePicker({ startDate, endDate, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange({ startDate: e.target.value, endDate })}
          className="rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <span className="text-sm text-slate-400">to</span>
      <div className="relative">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange({ startDate, endDate: e.target.value })}
          className="rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
    </div>
  );
}
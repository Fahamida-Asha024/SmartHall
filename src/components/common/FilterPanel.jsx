import React from "react";
import { SlidersHorizontal } from "lucide-react";

// filters = [{ key: "status", label: "Status", options: ["All", "Submitted", ...] }]
export default function FilterPanel({ filters, values, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SlidersHorizontal className="h-4 w-4 text-slate-400" />
      {filters.map((f) => (
        <select
          key={f.key}
          value={values[f.key] || "All"}
          onChange={(e) => onChange(f.key, e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">{f.label}: All</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
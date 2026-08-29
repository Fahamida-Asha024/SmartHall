import React from "react";
import { ArrowUpDown } from "lucide-react";

const DEFAULT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority", label: "Highest Priority" },
  { value: "updated", label: "Recently Updated" },
];

export default function SortDropdown({ value, onChange, options = DEFAULT_OPTIONS }) {
  return (
    <div className="relative">
      <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm text-slate-700 outline-none
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
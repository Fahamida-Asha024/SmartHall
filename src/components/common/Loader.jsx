import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-slate-500">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-rose-700">{title}</p>
      <p className="max-w-xs text-sm text-rose-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Try Again
        </button>
      )}
    </div>
  );
}
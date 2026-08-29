import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger", // "danger" | "default"
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${variant === "danger" ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-1 text-base font-semibold text-slate-900">{title}</h3>
        <p className="mb-6 text-sm text-slate-500">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${variant === "danger" ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { X, CheckCircle2, RotateCcw, Image as ImageIcon } from "lucide-react";
import ImageGallery from "../common/ImageGallery";

export default function VerifyCompletionModal({ workOrder, onApprove, onReject, onClose }) {
  const [showReworkInput, setShowReworkInput] = useState(false);
  const [reworkReason, setReworkReason] = useState("");

  if (!workOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Verify Completed Work</h3>
            <p className="mt-0.5 text-xs text-slate-400">{workOrder.id} • {workOrder.complaintId}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">{workOrder.title}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Completed by {workOrder.assignedStaffName} on{" "}
              {workOrder.completedDate && new Date(workOrder.completedDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Completion Notes</p>
            <p className="text-sm leading-6 text-slate-600">
              {workOrder.completionNotes || "No notes provided."}
            </p>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <ImageIcon className="h-3.5 w-3.5" /> Completion Photos
            </p>
            <ImageGallery images={workOrder.completionPhotos || []} />
          </div>

          {showReworkInput && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Reason for Rework
              </label>
              <textarea
                value={reworkReason}
                onChange={(e) => setReworkReason(e.target.value)}
                rows={3}
                placeholder="Explain what still needs to be fixed..."
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>

          {!showReworkInput ? (
            <button
              onClick={() => setShowReworkInput(true)}
              className="flex items-center gap-1.5 rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
            >
              <RotateCcw className="h-4 w-4" /> Send Back for Rework
            </button>
          ) : (
            <button
              onClick={() => reworkReason.trim() && onReject(workOrder.id, reworkReason.trim())}
              disabled={!reworkReason.trim()}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Rework
            </button>
          )}

          <button
            onClick={() => onApprove(workOrder.id)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4" /> Approve & Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
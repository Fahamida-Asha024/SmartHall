import React, { useState } from "react";
import { X, Ban } from "lucide-react";

export default function RejectComplaintModal({ complaint, onReject, onClose }) {
  const [reason, setReason] = useState("");

  if (!complaint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Ban className="h-5 w-5" />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <h3 className="mb-1 text-base font-semibold text-slate-900">Reject Complaint</h3>
        <p className="mb-4 text-sm text-slate-500">
          {complaint.id} • {complaint.title} — the student will see this reason.
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Explain why this complaint is being rejected..."
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => reason.trim() && onReject(complaint.id, reason.trim())}
            disabled={!reason.trim()}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reject Complaint
          </button>
        </div>
      </div>
    </div>
  );
}
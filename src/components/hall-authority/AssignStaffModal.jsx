import React, { useState } from "react";
import { X, Phone, Wrench, CheckCircle2 } from "lucide-react";
import StatusBadge from "../common/Badge/StatusBadge";
import PriorityBadge from "../common/Badge/PriorityBadge";

/* ------------------------------------------------------------------
   HallMate — Assign Maintenance Staff Modal (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Used for both first-time assignment and reassignment. Complaint
   details show up top, available staff are selectable below, and
   the currently assigned staff (if any) is pre-selected.
------------------------------------------------------------------- */

const AVAILABILITY_STYLES = {
  Available: "bg-emerald-50 text-emerald-700",
  Busy: "bg-amber-50 text-amber-700",
  "On Leave": "bg-slate-100 text-slate-500",
};

export default function AssignStaffModal({ complaint, staffList, onAssign, onClose }) {
  const [selectedStaffId, setSelectedStaffId] = useState(complaint?.assignedStaffId || null);

  if (!complaint) return null;

  const isReassign = !!complaint.assignedStaffId;

  const handleConfirm = () => {
    if (!selectedStaffId || selectedStaffId === complaint.assignedStaffId) return;
    onAssign(complaint.id, selectedStaffId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isReassign ? "Change Assigned Staff" : "Assign Maintenance Staff"}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">{complaint.id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================= COMPLAINT SUMMARY ================= */}

        <div className="border-b border-slate-100 px-6 py-4">
          <p className="text-sm font-semibold text-slate-800">{complaint.title}</p>
          <p className="mt-1 text-xs text-slate-500">
            {complaint.studentName} • {complaint.studentRoom} • {complaint.location}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>

          {isReassign && (
            <p className="mt-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700">
              Currently assigned to {complaint.assignedStaffName} ({complaint.assignmentStatus})
            </p>
          )}
        </div>

        {/* ================= STAFF LIST ================= */}

        <div className="px-6 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Available Maintenance Staff
          </p>

          <div className="space-y-2">
            {staffList.map((staff) => {
              const selected = selectedStaffId === staff.id;
              const disabled = staff.availability === "On Leave";

              return (
                <button
                  key={staff.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedStaffId(staff.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition
                    ${selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}
                    ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {staff.fullName.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">{staff.fullName}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <Wrench className="h-3 w-3" /> {staff.specialty}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <Phone className="h-3 w-3" /> {staff.phone} • {staff.activeAssignments} active
                    </p>
                  </div>

                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${AVAILABILITY_STYLES[staff.availability]}`}>
                    {staff.availability}
                  </span>

                  {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStaffId || selectedStaffId === complaint.assignedStaffId}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isReassign ? "Confirm Change" : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
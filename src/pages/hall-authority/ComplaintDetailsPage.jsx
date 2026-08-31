import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, UserCog, Ban, StickyNote, Image as ImageIcon } from "lucide-react";
import {
  mockHallComplaints, mockMaintenanceStaffList, COMPLAINT_PRIORITIES,
} from "../../mockHallAuthorityData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import ImageGallery from "../../components/common/ImageGallery";
import Timeline from "../../components/common/Timeline";
import AssignWorkModal from "../../components/hall-authority/AssignWorkModal";
import RejectComplaintModal from "../../components/hall-authority/RejectComplaintModal";

/* ------------------------------------------------------------------
   HallMate — Complaint Details (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-02/03/04: full complaint view + review actions (priority
   change, internal notes, assign, reject). Local state only —
   swap for real PATCH calls once the backend exists.
------------------------------------------------------------------- */

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const initial = mockHallComplaints.find((c) => c.id === id) || mockHallComplaints[0];

  const [complaint, setComplaint] = useState(initial);
  const [noteText, setNoteText] = useState("");
  const [showAssign, setShowAssign] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const canAssign = ["Under Review", "Assigned", "In Progress"].includes(complaint.status);
  const canReject = ["New", "Under Review"].includes(complaint.status);

  const handlePriorityChange = (priority) => {
    setComplaint((c) => ({ ...c, priority }));
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    setComplaint((c) => ({
      ...c,
      internalNotes: [...c.internalNotes, { author: "Dr. Kamal Hossain", note: noteText.trim(), timestamp: new Date().toISOString() }],
    }));
    setNoteText("");
  };

  const handleAssign = (complaintId, { staffId, instructions, expectedCompletion }) => {
    const staff = mockMaintenanceStaffList.find((s) => s.id === staffId);
    if (!staff) return;
    setComplaint((c) => ({
      ...c,
      status: "Assigned",
      assignedStaffId: staff.id,
      assignedStaffName: staff.fullName,
      expectedCompletion,
      history: [...c.history, { event: c.assignedStaffId ? "Reassigned" : "Maintenance staff assigned", user: "Dr. Kamal Hossain", timestamp: new Date().toISOString(), note: instructions }],
    }));
    setShowAssign(false);
  };

  const handleReject = (complaintId, reason) => {
    setComplaint((c) => ({
      ...c,
      status: "Rejected",
      rejectionReason: reason,
      history: [...c.history, { event: "Complaint rejected", user: "Dr. Kamal Hossain", timestamp: new Date().toISOString(), note: reason }],
    }));
    setShowReject(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/hall-authority/complaints" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to Complaints
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">{complaint.id} • {complaint.category}</p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">{complaint.title}</h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <StatusBadge status={complaint.status} />
            <select
              value={complaint.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-indigo-500"
            >
              {COMPLAINT_PRIORITIES.map((p) => <option key={p} value={p}>{p} Priority</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-400">Student</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{complaint.studentName} ({complaint.studentId})</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Location</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{complaint.location}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Submitted</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{new Date(complaint.submittedAt).toLocaleString()}</p>
          </div>
          {complaint.assignedStaffName && (
            <div>
              <p className="text-xs text-slate-400">Assigned Staff</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{complaint.assignedStaffName}</p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Description</p>
          <p className="text-sm leading-6 text-slate-600">{complaint.description}</p>
        </div>

        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <ImageIcon className="h-3.5 w-3.5" /> Attachments
          </p>
          <ImageGallery images={complaint.images} />
        </div>

        {complaint.status === "Rejected" && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">Rejection Reason</p>
            <p className="mt-1 text-sm text-rose-700">{complaint.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {(canAssign || canReject) && (
        <div className="flex flex-wrap justify-end gap-3">
          {canReject && (
            <button onClick={() => setShowReject(true)} className="flex items-center gap-2 rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
              <Ban className="h-4 w-4" /> Reject
            </button>
          )}
          {canAssign && (
            <button onClick={() => setShowAssign(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <UserCog className="h-4 w-4" /> {complaint.assignedStaffId ? "Reassign Staff" : "Assign Staff"}
            </button>
          )}
        </div>
      )}

      {/* Internal notes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          <StickyNote className="h-4 w-4" /> Internal Notes
        </h2>
        <div className="mt-3 space-y-2">
          {complaint.internalNotes.length === 0 ? (
            <p className="text-sm text-slate-400">No internal notes yet.</p>
          ) : complaint.internalNotes.map((n, i) => (
            <div key={i} className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {n.note}
              <p className="mt-0.5 text-xs text-amber-500">{n.author} • {new Date(n.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add an internal note (not visible to student)..."
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button onClick={handleAddNote} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900">
            Add
          </button>
        </div>
      </div>

      {/* Student comments */}
      {complaint.comments.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Student Comments</h2>
          <div className="mt-3 space-y-2">
            {complaint.comments.map((c, i) => (
              <div key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {c.message}
                <p className="mt-0.5 text-xs text-slate-400">{c.author} • {new Date(c.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">History</h2>
        <Timeline events={complaint.history} />
      </div>

      {showAssign && (
        <AssignWorkModal complaint={complaint} staffList={mockMaintenanceStaffList} onAssign={handleAssign} onClose={() => setShowAssign(false)} />
      )}
      {showReject && (
        <RejectComplaintModal complaint={complaint} onReject={handleReject} onClose={() => setShowReject(false)} />
      )}
    </div>
  );
}
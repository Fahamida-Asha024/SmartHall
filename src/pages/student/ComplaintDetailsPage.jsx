import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2, XCircle } from "lucide-react";
import { mockComplaints, mockStudent } from "../../mockStudentData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import ImageGallery from "../../components/common/ImageGallery";
import Timeline from "../../components/common/Timeline";

/* ------------------------------------------------------------------
   HallMate — Complaint Details (FRONTEND-ONLY)
   ------------------------------------------------------------------
   This route (/student/complaints/:id) was missing entirely, which
   is why "View Details" fell through to a catch-all redirect. Local
   state only — mutating a copy of the complaint found in
   mockComplaints by id.
------------------------------------------------------------------- */

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const initial = mockComplaints.find((c) => c.id === id);

  const [complaint, setComplaint] = useState(initial);
  const [comments, setComments] = useState(initial?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [reopenReason, setReopenReason] = useState("");
  const [showReopenForm, setShowReopenForm] = useState(false);

  if (!complaint) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-sm text-slate-500">Complaint not found.</p>
        <Link to="/student/complaints" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Back to My Complaints
        </Link>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { author: mockStudent.fullName, role: "Student", message: newComment.trim(), timestamp: new Date().toISOString() },
    ]);
    setNewComment("");
  };

  const handleConfirmFixed = () => {
    setComplaint((c) => ({ ...c, status: "Closed" }));
  };

  const handleConfirmNotFixed = () => setShowReopenForm(true);

  const handleSubmitReopen = (e) => {
    e.preventDefault();
    setComplaint((c) => ({ ...c, status: "Reopened" }));
    setShowReopenForm(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/student/complaints" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to My Complaints
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <CategoryIcon category={complaint.category} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">{complaint.id}</p>
            <h1 className="mt-0.5 text-lg font-bold text-slate-900">{complaint.title}</h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">{complaint.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-slate-400">Category</p>
            <p className="font-medium text-slate-800">{complaint.category}</p>
          </div>
          <div>
            <p className="text-slate-400">Location</p>
            <p className="font-medium text-slate-800">{complaint.location}</p>
          </div>
          <div>
            <p className="text-slate-400">Submitted</p>
            <p className="font-medium text-slate-800">{new Date(complaint.submittedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-slate-400">Last Updated</p>
            <p className="font-medium text-slate-800">{new Date(complaint.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {complaint.assignedWorker && (
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
            <span className="text-slate-400">Assigned to </span>
            <span className="font-medium text-slate-800">{complaint.assignedWorker}</span>
            {complaint.workOrderId && <span className="text-slate-400"> • {complaint.workOrderId}</span>}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Attached Images</h2>
        <ImageGallery images={complaint.images || []} />
      </div>

      {/* Resolution confirmation — only shown when status is Resolved */}
      {complaint.status === "Resolved" && !showReopenForm && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-sm font-semibold text-slate-800">
            Your complaint has been marked as resolved. Was your problem fixed?
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={handleConfirmFixed}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" /> Yes, Problem Solved
            </button>
            <button
              onClick={handleConfirmNotFixed}
              className="flex items-center gap-2 rounded-lg border border-rose-300 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <XCircle className="h-4 w-4" /> No, Still Having Problem
            </button>
          </div>
        </div>
      )}

      {showReopenForm && (
        <form onSubmit={handleSubmitReopen} className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
          <h2 className="mb-2 text-sm font-semibold text-slate-800">Reopen Complaint</h2>
          <p className="mb-3 text-xs text-slate-500">Let us know what's still wrong so we can take another look.</p>
          <textarea
            value={reopenReason}
            onChange={(e) => setReopenReason(e.target.value)}
            rows={3}
            required
            placeholder="Describe what's still not working..."
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
          />
          <div className="mt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setShowReopenForm(false)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">
              Reopen Complaint
            </button>
          </div>
        </form>
      )}

      {/* Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Complaint Timeline</h2>
        <Timeline events={complaint.history || []} />
      </div>

      {/* Comments */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Comments</h2>

        <div className="mb-4 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-slate-400">No comments yet.</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">
                    {c.author} <span className="text-xs font-normal text-slate-400">• {c.role}</span>
                  </p>
                  <span className="text-xs text-slate-400">
                    {new Date(c.timestamp).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{c.message}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
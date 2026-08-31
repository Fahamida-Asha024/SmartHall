import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, UserCog, Ban, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { mockHallWorkOrders, mockMaintenanceStaffList, isOverdue } from "../../mockHallAuthorityData";
import MaintenanceStatusBadge from "../../components/common/Badge/MaintenanceStatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import ImageGallery from "../../components/common/ImageGallery";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import AssignWorkModal from "../../components/hall-authority/AssignWorkModal";
import VerifyCompletionModal from "../../components/hall-authority/VerifyCompletionModal";

/* ------------------------------------------------------------------
   HallMate — Work Order Details (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-04/06/07: reassign, cancel, and — once the worker marks it
   completed — verify (approve/reject) the work.
------------------------------------------------------------------- */

export default function WorkOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initial = mockHallWorkOrders.find((w) => w.id === id) || mockHallWorkOrders[0];

  const [order, setOrder] = useState(initial);
  const [showReassign, setShowReassign] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleReassign = (complaintId, { staffId, instructions, expectedCompletion }) => {
    const staff = mockMaintenanceStaffList.find((s) => s.id === staffId);
    if (!staff) return;
    setOrder((o) => ({ ...o, assignedStaffId: staff.id, assignedStaffName: staff.fullName, instructions, expectedCompletion, status: "Assigned", acceptedByWorker: false }));
    setShowReassign(false);
  };

  const handleApprove = () => {
    setOrder((o) => ({ ...o, verification: "Approved" }));
    setShowVerify(false);
  };

  const handleRejectCompletion = (workOrderId, reworkReason) => {
    setOrder((o) => ({ ...o, status: "In Progress", verification: null, completionNotes: `${o.completionNotes}\n\nRework requested: ${reworkReason}` }));
    setShowVerify(false);
  };

  const handleCancelAssignment = () => {
    setOrder((o) => ({ ...o, status: "On Hold", assignedStaffId: null, assignedStaffName: "Unassigned" }));
    setShowCancelConfirm(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/hall-authority/work-orders" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to Work Orders
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">{order.id} • Complaint {order.complaintId}</p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">{order.title}</h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <MaintenanceStatusBadge status={order.status} />
            <PriorityBadge priority={order.priority} />
            {isOverdue(order) && <span className="text-xs font-semibold text-rose-600">Overdue</span>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-400">Assigned Staff</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{order.assignedStaffName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Accepted by Worker</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{order.acceptedByWorker ? "Yes" : "Not yet"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Assigned Date</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{new Date(order.assignedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Expected Completion</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{new Date(order.expectedCompletion).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Instructions Given</p>
          <p className="text-sm leading-6 text-slate-600">{order.instructions || "No specific instructions given."}</p>
        </div>

        {order.status === "Completed" && (
          <div className="mt-4 rounded-lg border border-slate-200 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <ImageIcon className="h-3.5 w-3.5" /> Completion Notes & Photos
            </p>
            <p className="whitespace-pre-line text-sm leading-6 text-slate-600">{order.completionNotes}</p>
            <div className="mt-3">
              <ImageGallery images={order.completionPhotos} />
            </div>
            <p className="mt-3 text-xs font-medium text-slate-500">
              Verification: {order.verification === "Approved" ? "Approved — complaint resolved" : "Pending your review"}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        {order.status !== "Completed" && order.status !== "Assigned" === false && order.assignedStaffId && (
          <button onClick={() => setShowCancelConfirm(true)} className="flex items-center gap-2 rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
            <Ban className="h-4 w-4" /> Cancel Assignment
          </button>
        )}
        {order.status !== "Completed" && (
          <button onClick={() => setShowReassign(true)} className="flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            <UserCog className="h-4 w-4" /> Reassign
          </button>
        )}
        {order.status === "Completed" && order.verification === "Pending" && (
          <button onClick={() => setShowVerify(true)} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Verify Completion
          </button>
        )}
      </div>

      {showReassign && (
        <AssignWorkModal
          complaint={{ id: order.complaintId, title: order.title, studentName: "", studentRoom: order.location, location: order.location, status: order.status, priority: order.priority, assignedStaffId: order.assignedStaffId, assignedStaffName: order.assignedStaffName }}
          staffList={mockMaintenanceStaffList}
          onAssign={handleReassign}
          onClose={() => setShowReassign(false)}
        />
      )}
      {showVerify && (
        <VerifyCompletionModal workOrder={order} onApprove={handleApprove} onReject={handleRejectCompletion} onClose={() => setShowVerify(false)} />
      )}
      <ConfirmDialog
        open={showCancelConfirm}
        title="Cancel this assignment?"
        message={`${order.assignedStaffName} will be unassigned from ${order.id}. The complaint will go back to unassigned.`}
        confirmLabel="Cancel Assignment"
        variant="danger"
        onConfirm={handleCancelAssignment}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
}
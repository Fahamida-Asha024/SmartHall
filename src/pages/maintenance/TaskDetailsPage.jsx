import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
} from "lucide-react";

import { mockWorkOrders } from "../../mockMaintenanceData";
import MaintenanceStatusBadge from "../../components/common/Badge/MaintenanceStatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";

export default function TaskDetailsPage() {
  const { id } = useParams();

  const initial =
    mockWorkOrders.find((workOrder) => workOrder.id === id) ||
    mockWorkOrders[0];

  const [order, setOrder] = useState(initial);
  const [workerNotes, setWorkerNotes] = useState(
    initial.workerNotes || ""
  );

  const setStatus = (status) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      status,
    }));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">

      {/* ==================== BACK ==================== */}

      <Link
        to="/maintenance/dashboard"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* ==================== TASK DETAILS ==================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-xs text-slate-400">
              {order.id} • Complaint {order.complaintId}
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-900">
              {order.title}
            </h1>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <MaintenanceStatusBadge status={order.status} />
            <PriorityBadge priority={order.priority} />
          </div>

        </div>

        {/* Information */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <p className="text-xs text-slate-400">
              Location
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {order.location}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Category
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {order.category}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Assigned Date
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {new Date(order.assignedDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Expected Completion
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {new Date(
                order.expectedCompletion
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* Complaint / Authority Instructions */}

        <div className="mt-6 rounded-lg bg-slate-50 p-4">

          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Work Instructions
          </p>

          <p className="text-sm leading-6 text-slate-600">
            {order.adminInstructions ||
              "Please complete the assigned maintenance work."}
          </p>

        </div>

      </div>

      {/* ==================== WORKER NOTES ==================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-sm font-semibold text-slate-800">
          Work Notes
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Add any relevant information about the work.
        </p>

        <textarea
          value={workerNotes}
          onChange={(e) => setWorkerNotes(e.target.value)}
          rows={4}
          placeholder="Write notes about the maintenance work..."
          className="mt-4 w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

      </div>

      {/* ==================== COMPLETED MESSAGE ==================== */}

      {order.status === "Completed" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

          <div className="flex items-center gap-2 text-emerald-700">

            <CheckCircle2 className="h-5 w-5" />

            <h2 className="text-sm font-semibold">
              Work Completed
            </h2>

          </div>

          <p className="mt-2 text-sm text-slate-600">
            This work order has been marked as completed.
          </p>

        </div>
      )}

      {/* ==================== ACTIONS ==================== */}

      {order.status !== "Completed" && (
        <div className="flex justify-end">

          {/* Assigned → In Progress */}

          {order.status === "Assigned" && (
            <button
              type="button"
              onClick={() => setStatus("In Progress")}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Play className="h-4 w-4" />
              Start Work
            </button>
          )}

          {/* In Progress → Completed */}

          {order.status === "In Progress" && (
            <button
              type="button"
              onClick={() => setStatus("Completed")}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark as Completed
            </button>
          )}

        </div>
      )}

    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Eye } from "lucide-react";
import { mockHallWorkOrders } from "../../mockHallAuthorityData";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — Completed Work (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-07: split into work awaiting verification vs. already
   verified/resolved. Full approve/reject flow lives on the work
   order details page — this is the queue view.
------------------------------------------------------------------- */

const TABS = ["Awaiting Verification", "Verified"];

export default function CompletedWorkPage() {
  const [tab, setTab] = useState("Awaiting Verification");

  const completed = mockHallWorkOrders.filter((w) => w.status === "Completed");
  const list = completed.filter((w) => (tab === "Awaiting Verification" ? w.verification === "Pending" : w.verification === "Approved"));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Completed Work</h1>
        <p className="text-sm text-slate-500">Review work marked complete by maintenance staff</p>
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${tab === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {list.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="Nothing here" message="No work orders in this list right now." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {list.map((w) => (
              <div key={w.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{w.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{w.assignedStaffName} • {w.location}</p>
                  <p className="mt-0.5 text-xs text-slate-400">Completed {new Date(w.completedDate).toLocaleDateString()}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${w.verification === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {w.verification === "Approved" ? "Verified — Resolved" : "Needs Verification"}
                </span>
                <Link to={`/hall-authority/work-orders/${w.id}`} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 sm:ml-2">
                  <Eye className="h-4 w-4" /> Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
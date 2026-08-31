import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { mockHallWorkOrders, WORK_ORDER_STATUSES, isOverdue } from "../../mockHallAuthorityData";
import MaintenanceStatusBadge from "../../components/common/Badge/MaintenanceStatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — Monitor Work Orders (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-06: see every work order for this hall, filterable by
   status, plus an "Overdue" chip computed from expectedCompletion.
------------------------------------------------------------------- */

const CHIPS = ["All", ...WORK_ORDER_STATUSES, "Overdue"];

export default function WorkOrdersPage() {
  const [activeChip, setActiveChip] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...mockHallWorkOrders];
    if (activeChip === "Overdue") result = result.filter(isOverdue);
    else if (activeChip !== "All") result = result.filter((w) => w.status === activeChip);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((w) => w.title.toLowerCase().includes(q) || w.id.toLowerCase().includes(q) || w.assignedStaffName.toLowerCase().includes(q));
    }
    return result.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
  }, [activeChip, search]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Work Orders</h1>
          <p className="text-sm text-slate-500">Monitor every maintenance task assigned in your hall</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search work orders..." />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition
              ${activeChip === chip ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {filtered.length === 0 ? (
          <EmptyState title="No work orders found" message="Try a different filter." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {filtered.map((w) => (
              <div key={w.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{w.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{w.assignedStaffName} • {w.location}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {w.id} • Due {new Date(w.expectedCompletion).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-xs">
                  {w.acceptedByWorker ? (
                    <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Accepted</span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400"><XCircle className="h-3.5 w-3.5" /> Not yet accepted</span>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                  <MaintenanceStatusBadge status={w.status} />
                  <PriorityBadge priority={w.priority} />
                  {isOverdue(w) && <span className="text-xs font-medium text-rose-600">Overdue</span>}
                </div>
                <Link
                  to={`/hall-authority/work-orders/${w.id}`}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 sm:ml-2"
                >
                  View <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { mockWorkOrders } from "../../mockMaintenanceData";
import MaintenanceStatusBadge from "../../components/common/Badge/MaintenanceStatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — Work History (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Covers requirement 10: view work history. Shows completed work
   orders for this worker, searchable by title/complaint ID.
------------------------------------------------------------------- */

export default function WorkHistoryPage() {
  const [search, setSearch] = useState("");

  const completed = useMemo(() => {
    let result = mockWorkOrders.filter((wo) => wo.status === "Completed");
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((wo) => wo.title.toLowerCase().includes(q) || wo.id.toLowerCase().includes(q));
    }
    return result.sort((a, b) => new Date(b.expectedCompletion) - new Date(a.expectedCompletion));
  }, [search]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Work History</h1>
        <p className="text-sm text-slate-500">Your completed work orders</p>
      </div>

      <div className="w-full sm:w-80">
        <SearchBar value={search} onChange={setSearch} placeholder="Search completed work..." />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {completed.length === 0 ? (
          <EmptyState title="No completed work yet" message="Finished work orders will appear here." />
        ) : (
          <div className="divide-y divide-slate-100">
            {completed.map((wo) => (
              <div key={wo.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{wo.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{wo.location} • {wo.category}</p>
                  <p className="mt-1 text-xs text-slate-400">{wo.completionNotes}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <PriorityBadge priority={wo.priority} />
                  <MaintenanceStatusBadge status={wo.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
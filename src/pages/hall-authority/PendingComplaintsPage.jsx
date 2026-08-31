import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { mockHallComplaints } from "../../mockHallAuthorityData";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — Pending Review (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-03: the review queue — only "New" and "Under Review"
   complaints, i.e. ones that still need a decision.
------------------------------------------------------------------- */

export default function PendingComplaintsPage() {
  const [search, setSearch] = useState("");

  const pending = mockHallComplaints
    .filter((c) => ["New", "Under Review"].includes(c.status))
    .filter((c) => !search.trim() || c.title.toLowerCase().includes(search.trim().toLowerCase()) || c.studentName.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Pending Review</h1>
          <p className="text-sm text-slate-500">Complaints waiting for your review before assignment or rejection</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {pending.length === 0 ? (
          <EmptyState title="Nothing to review" message="All complaints have been reviewed." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {pending.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                <CategoryIcon category={c.category} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.studentName} • {c.studentRoom}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {c.id} • Submitted {new Date(c.submittedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </p>
                </div>
                <PriorityBadge priority={c.priority} />
                <Link
                  to={`/hall-authority/complaints/${c.id}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:ml-2"
                >
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
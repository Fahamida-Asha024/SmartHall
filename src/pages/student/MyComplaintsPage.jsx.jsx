import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { mockComplaints, complaintCategories, complaintPriorities } from "../../mockStudentData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import FilterPanel from "../../components/common/FilterPanel";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — My Complaints (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Status chips (All/Pending/In Progress/Resolved/Reopened) filter
   first, search narrows within that, then the optional FilterPanel
   (category/priority) narrows further. Everything runs on the local
   mockComplaints array — swap for a real fetch later, the JSX stays
   the same.
------------------------------------------------------------------- */

const PAGE_SIZE = 4;

// Chips group several raw statuses together, matching the mockup's
// 4 buckets (Pending covers Submitted + Under Review, etc.)
const CHIP_GROUPS = {
  All: null,
  Pending: ["Submitted", "Under Review"],
  "In Progress": ["Assigned", "In Progress"],
  Resolved: ["Resolved", "Closed"],
  Reopened: ["Reopened"],
};

function countForChip(complaints, chipLabel) {
  const statuses = CHIP_GROUPS[chipLabel];
  if (!statuses) return complaints.length;
  return complaints.filter((c) => statuses.includes(c.status)).length;
}

function ComplaintRow({ complaint }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4">
      <CategoryIcon category={complaint.category} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{complaint.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {complaint.location} • {complaint.category}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          {complaint.id} • {new Date(complaint.submittedAt).toLocaleDateString(undefined, {
            month: "short", day: "numeric", year: "numeric",
          })}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
        <StatusBadge status={complaint.status} />
        <PriorityBadge priority={complaint.priority} />
      </div>

      <Link
        to={`/student/complaints/${complaint.id}`}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 sm:ml-2"
      >
        View Details <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function MyComplaintsPage() {
  const [activeChip, setActiveChip] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...mockComplaints];

    // Status chip filter
    const chipStatuses = CHIP_GROUPS[activeChip];
    if (chipStatuses) {
      result = result.filter((c) => chipStatuses.includes(c.status));
    }

    // Search (title or complaint ID)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
      );
    }

    // Extra filters (category, priority)
    if (filterValues.category && filterValues.category !== "All") {
      result = result.filter((c) => c.category === filterValues.category);
    }
    if (filterValues.priority && filterValues.priority !== "All") {
      result = result.filter((c) => c.priority === filterValues.priority);
    }

    // Sort newest first by default
    result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return result;
  }, [activeChip, search, filterValues]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleChipClick = (chip) => {
    setActiveChip(chip);
    setPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Complaints</h1>
          <p className="text-sm text-slate-500">View and track all your submitted complaints</p>
        </div>
        <div className="flex gap-2">
          <div className="w-56 sm:w-72">
            <SearchBar value={search} onChange={handleSearchChange} placeholder="Search complaints..." />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition
              ${showFilters ? "border-indigo-300 bg-indigo-50 text-indigo-600" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Optional extra filter panel (category/priority) */}
      {showFilters && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <FilterPanel
            filters={[
              { key: "category", label: "Category", options: complaintCategories },
              { key: "priority", label: "Priority", options: complaintPriorities },
            ]}
            values={filterValues}
            onChange={handleFilterChange}
          />
        </div>
      )}

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(CHIP_GROUPS).map((chip) => {
          const active = activeChip === chip;
          const count = countForChip(mockComplaints, chip);
          return (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition
                ${active
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {chip}
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold
                  ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Complaint list */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {paginated.length === 0 ? (
          <EmptyState
            title="No complaints found"
            message="Try adjusting your search or filters."
          />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {paginated.map((c) => (
              <ComplaintRow key={c.id} complaint={c} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { mockHallComplaints, COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES, COMPLAINT_STATUSES } from "../../mockHallAuthorityData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import SearchBar from "../../components/common/SearchBar";
import FilterPanel from "../../components/common/FilterPanel";
import SortDropdown from "../../components/common/SortDropdown";
import DateRangePicker from "../../components/common/DateRangePicker";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — All Complaints (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-02: search/filter/sort over this hall's complaints only.
   "priority" query param lets the sidebar's "High Priority" link
   land here pre-filtered.
------------------------------------------------------------------- */

const PAGE_SIZE = 6;

export default function AllComplaintsPage() {
  const [searchParams] = useSearchParams();
  const presetPriority = searchParams.get("priority") || "All";

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({ priority: presetPriority });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...mockHallComplaints];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.studentName.toLowerCase().includes(q)
      );
    }
    if (filterValues.category && filterValues.category !== "All") result = result.filter((c) => c.category === filterValues.category);
    if (filterValues.priority && filterValues.priority !== "All") result = result.filter((c) => c.priority === filterValues.priority);
    if (filterValues.status && filterValues.status !== "All") result = result.filter((c) => c.status === filterValues.status);
    if (dateRange.startDate) result = result.filter((c) => new Date(c.submittedAt) >= new Date(dateRange.startDate));
    if (dateRange.endDate) result = result.filter((c) => new Date(c.submittedAt) <= new Date(dateRange.endDate));

    const priorityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    if (sort === "newest") result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    if (sort === "oldest") result.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    if (sort === "priority") result.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
    if (sort === "updated") result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return result;
  }, [search, filterValues, dateRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">All Complaints</h1>
        <p className="text-sm text-slate-500">Every complaint submitted by students in your hall</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-72">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search complaints, students..." />
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <FilterPanel
            filters={[
              { key: "category", label: "Category", options: COMPLAINT_CATEGORIES },
              { key: "priority", label: "Priority", options: COMPLAINT_PRIORITIES },
              { key: "status", label: "Status", options: COMPLAINT_STATUSES },
            ]}
            values={filterValues}
            onChange={handleFilterChange}
          />
          <DateRangePicker startDate={dateRange.startDate} endDate={dateRange.endDate} onChange={(r) => { setDateRange(r); setPage(1); }} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {paginated.length === 0 ? (
          <EmptyState title="No complaints found" message="Try adjusting your search or filters." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {paginated.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                <CategoryIcon category={c.category} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.studentName} • {c.studentRoom}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {c.id} • {new Date(c.submittedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                  <StatusBadge status={c.status} />
                  <PriorityBadge priority={c.priority} />
                </div>
                <Link
                  to={`/hall-authority/complaints/${c.id}`}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 sm:ml-2"
                >
                  View <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {filtered.length > 0 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}
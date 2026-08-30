import React, { useMemo, useState } from "react";
import { mockAuditLog, mockUsers } from "../../../mockAdminData";
import SearchBar from "../../../components/common/SearchBar";
import FilterPanel from "../../../components/common/FilterPanel";
import DateRangePicker from "../../../components/common/DateRangePicker";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";
import RoleBadge from "../../../components/common/Badge/RoleBadge";

const PAGE_SIZE = 8;
const ROLES = ["Student", "Hall Authority", "Maintenance Staff", "Admin"];
const ACTION_TYPES = [...new Set(mockAuditLog.map((l) => l.action))];

export default function ActivityLogPage() {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...mockAuditLog];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (l) => l.user.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.entityId.toLowerCase().includes(q)
      );
    }
    if (filterValues.role && filterValues.role !== "All") {
      result = result.filter((l) => l.role === filterValues.role);
    }
    if (filterValues.action && filterValues.action !== "All") {
      result = result.filter((l) => l.action === filterValues.action);
    }
    if (dateRange.startDate) {
      result = result.filter((l) => new Date(l.timestamp) >= new Date(dateRange.startDate));
    }
    if (dateRange.endDate) {
      result = result.filter((l) => new Date(l.timestamp) <= new Date(dateRange.endDate));
    }

    return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [search, filterValues, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Activity Log</h1>
        <p className="text-sm text-slate-500">Read-only audit trail of important system actions</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-72">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by user, action, or ID..." />
          </div>
          <FilterPanel
            filters={[
              { key: "role", label: "Role", options: ROLES },
              { key: "action", label: "Action", options: ACTION_TYPES },
            ]}
            values={filterValues}
            onChange={(key, value) => { setFilterValues((p) => ({ ...p, [key]: value })); setPage(1); }}
          />
        </div>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={(v) => { setDateRange(v); setPage(1); }}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        {paginated.length === 0 ? (
          <EmptyState title="No activity found" message="Try adjusting your search, filters, or date range." />
        ) : (
          <div className="divide-y divide-slate-100">
            {paginated.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4">
                <div className="w-32 shrink-0 text-xs text-slate-400">
                  {new Date(log.timestamp).toLocaleString(undefined, {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{log.action}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{log.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium text-slate-700">{log.user}</p>
                  <div className="mt-1"><RoleBadge role={log.role} /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
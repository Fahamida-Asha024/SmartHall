import React, { useMemo, useState } from "react";
import { UserPlus } from "lucide-react";
import { mockUsers as initialUsers, mockHalls } from "../../../mockAdminData";
import UserTable from "../../../components/admin/UserTable";
import SearchBar from "../../../components/common/SearchBar";
import FilterPanel from "../../../components/common/FilterPanel";
import Pagination from "../../../components/common/Pagination";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";

/* ------------------------------------------------------------------
   HallMate — Hall Authority Management (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Same table/search/filter/pagination pattern as UserManagementPage,
   pre-filtered to role = "Hall Authority". One Hall Authority = one
   hall (per your earlier decision), so the hall filter uses mockHalls
   instead of a role filter — role is already fixed on this page.
------------------------------------------------------------------- */

const PAGE_SIZE = 6;
const STATUSES = ["Active", "Inactive"];

export default function HallAuthorityManagementPage() {
  const [users, setUsers] = useState(initialUsers.filter((u) => u.role === "Hall Authority"));
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = useMemo(() => {
    let result = [...users];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (filterValues.hall && filterValues.hall !== "All") {
      result = result.filter((u) => u.hall === filterValues.hall);
    }
    if (filterValues.status && filterValues.status !== "All") {
      result = result.filter((u) => u.status === filterValues.status);
    }
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [users, search, filterValues]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleToggleStatus = (user) => setConfirmAction({ type: "toggle", user });
  const handleDelete = (user) => setConfirmAction({ type: "delete", user });

  const runConfirmedAction = () => {
    if (!confirmAction) return;
    const { type, user } = confirmAction;
    if (type === "toggle") {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)));
    } else if (type === "delete") {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
    setConfirmAction(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Hall Authority Management</h1>
          <p className="text-sm text-slate-500">Each Hall Authority is assigned to exactly one hall</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          <UserPlus className="h-4 w-4" /> Create Hall Authority
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-80">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name or email..." />
        </div>
        <FilterPanel
          filters={[
            { key: "hall", label: "Hall", options: mockHalls },
            { key: "status", label: "Status", options: STATUSES },
          ]}
          values={filterValues}
          onChange={(key, value) => { setFilterValues((p) => ({ ...p, [key]: value })); setPage(1); }}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        {paginated.length === 0 ? (
          <EmptyState title="No hall authorities found" message="Try adjusting your search or filters." />
        ) : (
          <UserTable
            users={paginated}
            showHallColumn
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onView={(u) => console.log("view", u)}
            onEdit={(u) => console.log("edit", u)}
            onResetPassword={(u) => console.log("reset password", u)}
          />
        )}
      </div>

      {filtered.length > 0 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}

      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.type === "delete" ? "Delete this hall authority?" : `${confirmAction?.user?.status === "Active" ? "Deactivate" : "Activate"} this account?`}
        message={
          confirmAction?.type === "delete"
            ? `${confirmAction?.user?.fullName} will be permanently removed and their hall will need a new assigned authority.`
            : `${confirmAction?.user?.fullName}'s account will be ${confirmAction?.user?.status === "Active" ? "deactivated" : "activated"}.`
        }
        confirmLabel={confirmAction?.type === "delete" ? "Delete" : "Confirm"}
        variant={confirmAction?.type === "delete" ? "danger" : "default"}
        onConfirm={runConfirmedAction}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { UserCog, CheckCircle2 } from "lucide-react";
import { mockHallComplaints, mockMaintenanceStaffList } from "../../mockHallAuthorityData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import AssignStaffModal from "../../components/hall-authority/AssignStaffModal";

/* ------------------------------------------------------------------
   HallMate — Complaint Assignment (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-05: Review a complaint and assign it to a Maintenance Staff.
   Same list/filter/search pattern as MyComplaintsPage.jsx. Runs on
   the local mockHallComplaints array — swap for a real fetch + PATCH
   assignment call later, JSX stays the same.
------------------------------------------------------------------- */

const PAGE_SIZE = 4;

const CHIP_GROUPS = {
  All: null,
  "Awaiting Assignment": (c) => !c.assignedStaffId,
  Assigned: (c) => !!c.assignedStaffId,
};

function countForChip(complaints, chipLabel) {
  const predicate = CHIP_GROUPS[chipLabel];
  if (!predicate) return complaints.length;
  return complaints.filter(predicate).length;
}

function ComplaintRow({ complaint, onAssignClick }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4">
      <CategoryIcon category={complaint.category} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{complaint.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {complaint.studentName} • {complaint.studentRoom}
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
        {complaint.assignedStaffId && (
          <p className="text-xs text-slate-500">→ {complaint.assignedStaffName}</p>
        )}
      </div>

      <button
        onClick={() => onAssignClick(complaint)}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition sm:ml-2
          ${complaint.assignedStaffId
            ? "border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
      >
        <UserCog className="h-4 w-4" />
        {complaint.assignedStaffId ? "Reassign" : "Assign Staff"}
      </button>
    </div>
  );
}

export default function ComplaintAssignmentPage() {
  const [complaints, setComplaints] = useState(mockHallComplaints);
  const [activeChip, setActiveChip] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const filtered = useMemo(() => {
    let result = [...complaints];

    const predicate = CHIP_GROUPS[activeChip];
    if (predicate) result = result.filter(predicate);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.studentName.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return result;
  }, [complaints, activeChip, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleChipClick = (chip) => {
    setActiveChip(chip);
    setPage(1);
  };

  const handleAssign = (complaintId, staffId) => {
    const staff = mockMaintenanceStaffList.find((s) => s.id === staffId);
    if (!staff) return;

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              assignedStaffId: staff.id,
              assignedStaffName: staff.fullName,
              assignmentStatus: "Assigned",
              status: c.status === "Reopened" ? c.status : "Assigned",
            }
          : c
      )
    );

    setAssigningComplaint(null);
    setSuccessMessage(`${staff.fullName} has been assigned to ${complaintId}.`);
    setTimeout(() => setSuccessMessage(""), 3500);
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assign Maintenance Staff</h1>
          <p className="text-sm text-slate-500">Review complaints and assign them to available maintenance staff</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search complaints..." />
        </div>
      </div>

      {/* Success banner */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(CHIP_GROUPS).map((chip) => {
          const active = activeChip === chip;
          const count = countForChip(complaints, chip);
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
          <EmptyState title="No complaints found" message="Try adjusting your search or filters." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {paginated.map((c) => (
              <ComplaintRow key={c.id} complaint={c} onAssignClick={setAssigningComplaint} />
            ))}
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      <AssignStaffModal
        complaint={assigningComplaint}
        staffList={mockMaintenanceStaffList}
        onAssign={handleAssign}
        onClose={() => setAssigningComplaint(null)}
      />
    </div>
  );
}
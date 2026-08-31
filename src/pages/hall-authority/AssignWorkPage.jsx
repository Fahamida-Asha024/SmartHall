import React, { useMemo, useState } from "react";
import { UserCog, CheckCircle2 } from "lucide-react";
import { mockHallComplaints, mockMaintenanceStaffList } from "../../mockHallAuthorityData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";
import AssignWorkModal from "../../components/hall-authority/AssignWorkModal";

/* ------------------------------------------------------------------
   HallMate — Assign Work (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-04: reviewed complaints (Under Review / already assigned)
   waiting for a work order to be created and a staff member picked.
------------------------------------------------------------------- */

const CHIPS = { All: null, "Awaiting Assignment": (c) => !c.assignedStaffId, Assigned: (c) => !!c.assignedStaffId };

export default function AssignWorkPage() {
  const [complaints, setComplaints] = useState(
    mockHallComplaints.filter((c) => ["Under Review", "Assigned", "In Progress"].includes(c.status))
  );
  const [activeChip, setActiveChip] = useState("All");
  const [search, setSearch] = useState("");
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const filtered = useMemo(() => {
    let result = [...complaints];
    const predicate = CHIPS[activeChip];
    if (predicate) result = result.filter(predicate);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.studentName.toLowerCase().includes(q));
    }
    return result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }, [complaints, activeChip, search]);

  const handleAssign = (complaintId, { staffId, instructions, expectedCompletion }) => {
    const staff = mockMaintenanceStaffList.find((s) => s.id === staffId);
    if (!staff) return;
    setComplaints((prev) => prev.map((c) => (
      c.id === complaintId
        ? { ...c, status: "Assigned", assignedStaffId: staff.id, assignedStaffName: staff.fullName, expectedCompletion }
        : c
    )));
    setAssigningComplaint(null);
    setSuccessMessage(`${staff.fullName} has been assigned to ${complaintId}. A work order has been created.`);
    setTimeout(() => setSuccessMessage(""), 3500);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assign Work</h1>
          <p className="text-sm text-slate-500">Create work orders and assign reviewed complaints to maintenance staff</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search complaints..." />
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> {successMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {Object.keys(CHIPS).map((chip) => (
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
          <EmptyState title="Nothing to assign" message="No reviewed complaints are waiting right now." />
        ) : (
          <div className="divide-y divide-slate-100 px-2">
            {filtered.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                <CategoryIcon category={c.category} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.studentName} • {c.studentRoom}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{c.id}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                  <StatusBadge status={c.status} />
                  <PriorityBadge priority={c.priority} />
                  {c.assignedStaffId && <p className="text-xs text-slate-500">→ {c.assignedStaffName}</p>}
                </div>
                <button
                  onClick={() => setAssigningComplaint(c)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition sm:ml-2
                    ${c.assignedStaffId ? "border border-indigo-200 text-indigo-600 hover:bg-indigo-50" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                >
                  <UserCog className="h-4 w-4" /> {c.assignedStaffId ? "Reassign" : "Assign Staff"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AssignWorkModal
        complaint={assigningComplaint}
        staffList={mockMaintenanceStaffList}
        onAssign={handleAssign}
        onClose={() => setAssigningComplaint(null)}
      />
    </div>
  );
}
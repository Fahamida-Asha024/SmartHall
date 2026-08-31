import React from "react";
import { Link } from "react-router-dom";
import {
  Inbox, FileClock, Loader2, CheckCircle2, AlertTriangle, Flame, ChevronRight,
} from "lucide-react";
import {
  mockHallComplaints, mockHallWorkOrders, mockHallAuthority,
  getDashboardStats,
} from "../../mockHallAuthorityData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";

/* ------------------------------------------------------------------
   HallMate — Hall Authority Dashboard (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Scoped entirely to mockHallComplaints / mockHallWorkOrders (this
   hall only), per requirement doc section 1.
------------------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    indigo: "bg-indigo-100 text-indigo-600",
    amber: "bg-amber-100 text-amber-600",
    sky: "bg-sky-100 text-sky-600",
    emerald: "bg-emerald-100 text-emerald-600",
    rose: "bg-rose-100 text-rose-600",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function HallAuthorityDashboardPage() {
  const stats = getDashboardStats(mockHallComplaints, mockHallWorkOrders);

  const recentComplaints = [...mockHallComplaints]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  const recentCompletedWork = [...mockHallWorkOrders]
    .filter((w) => w.status === "Completed")
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">{mockHallAuthority.hall} — complaints & maintenance overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Complaints" value={stats.total} icon={Inbox} tone="slate" />
        <StatCard label="New" value={stats.new} icon={FileClock} tone="indigo" />
        <StatCard label="Pending Review" value={stats.pending} icon={FileClock} tone="amber" />
        <StatCard label="In Progress" value={stats.inProgress} icon={Loader2} tone="sky" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Overdue Tasks" value={stats.overdue} icon={AlertTriangle} tone="rose" />
        <StatCard label="High Priority" value={stats.highPriority} icon={Flame} tone="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recently Submitted Complaints</h2>
            <Link to="/hall-authority/complaints" className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentComplaints.map((c) => (
              <Link key={c.id} to={`/hall-authority/complaints/${c.id}`} className="flex items-center justify-between gap-3 py-3 transition hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.studentName} • {c.studentRoom}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <StatusBadge status={c.status} />
                  <PriorityBadge priority={c.priority} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recently Completed Work</h2>
            <Link to="/hall-authority/completed-work" className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recentCompletedWork.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No completed work yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentCompletedWork.map((w) => (
                <Link key={w.id} to={`/hall-authority/work-orders/${w.id}`} className="flex items-center justify-between gap-3 py-3 transition hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{w.title}</p>
                    <p className="text-xs text-slate-400">{w.assignedStaffName} • {new Date(w.completedDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${w.verification === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {w.verification === "Approved" ? "Verified" : "Needs Verification"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
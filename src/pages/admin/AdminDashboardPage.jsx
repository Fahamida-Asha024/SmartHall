import React from "react";
import { Link } from "react-router-dom";
import {
  Users, GraduationCap, ShieldCheck, Wrench, Inbox, Clock,
  Loader2, CheckCircle2, RotateCcw, UserCheck, UserX, ChevronRight
} from "lucide-react";
import { mockUsers, mockAuditLog, getSystemStats, mockSystemComplaintCounts } from "../../mockAdminData";

/* ------------------------------------------------------------------
   HallMate — Admin Dashboard (FRONTEND-ONLY)
   ------------------------------------------------------------------
   System monitoring only — no individual complaint actions live
   here, per the requirements doc. Everything reads from
   mockAdminData.js; swap for real aggregate API calls later.
------------------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    indigo: "bg-indigo-100 text-indigo-600",
    sky: "bg-sky-100 text-sky-600",
    amber: "bg-amber-100 text-amber-600",
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

const ROLE_STYLES = {
  Student: "bg-indigo-100 text-indigo-700",
  "Hall Authority": "bg-sky-100 text-sky-700",
  "Maintenance Staff": "bg-amber-100 text-amber-700",
  Admin: "bg-slate-200 text-slate-700",
};

function RoleBadge({ role }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role] || "bg-slate-100 text-slate-600"}`}>
      {role}
    </span>
  );
}

export default function AdminDashboardPage() {
  const stats = getSystemStats(mockUsers);
  const complaints = mockSystemComplaintCounts;

  const recentUsers = [...mockUsers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentActivity = [...mockAuditLog]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">System Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of users, complaints, and system health</p>
      </div>

      {/* User stats */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Users</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} tone="slate" />
          <StatCard label="Students" value={stats.totalStudents} icon={GraduationCap} tone="indigo" />
          <StatCard label="Hall Authorities" value={stats.totalHallAuthorities} icon={ShieldCheck} tone="sky" />
          <StatCard label="Maintenance Staff" value={stats.totalMaintenanceStaff} icon={Wrench} tone="amber" />
          <StatCard label="Active Users" value={stats.activeUsers} icon={UserCheck} tone="emerald" />
          <StatCard label="Inactive Users" value={stats.inactiveUsers} icon={UserX} tone="rose" />
        </div>
      </div>

      {/* Complaint stats */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Complaints (System-Wide)</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total" value={complaints.total} icon={Inbox} tone="slate" />
          <StatCard label="Pending" value={complaints.pending} icon={Clock} tone="amber" />
          <StatCard label="In Progress" value={complaints.inProgress} icon={Loader2} tone="sky" />
          <StatCard label="Resolved" value={complaints.resolved} icon={CheckCircle2} tone="emerald" />
          <StatCard label="Closed" value={complaints.closed} icon={CheckCircle2} tone="slate" />
          <StatCard label="Reopened" value={complaints.reopened} icon={RotateCcw} tone="rose" />
        </div>
      </div>

      {/* Two-column: recent users + recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recently registered users */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recently Registered Users</h2>
            <Link to="/admin/users" className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-1">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-slate-50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {u.fullName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{u.fullName}</p>
                  <p className="truncate text-xs text-slate-400">{u.email}</p>
                </div>
                <RoleBadge role={u.role} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent system activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recent System Activity</h2>
            <Link to="/admin/activity-log" className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((log) => (
              <div key={log.id} className="border-b border-slate-50 pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{log.action}</p>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(log.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{log.description}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {log.user} • <RoleBadge role={log.role} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
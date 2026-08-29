import React from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle, FileText, Bell, User, ChevronRight,
  Clock, Loader2, CheckCircle2, RotateCcw, Inbox
} from "lucide-react";
import {
  mockStudent,
  mockComplaints,
  mockNotifications,
  getComplaintCounts,
} from "../../mockStudentData";
import StatusBadge from "../../components/common/Badge/StatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";
import CategoryIcon from "../../components/common/CategoryIcon";

/* ------------------------------------------------------------------
   HallMate — Student Dashboard (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Matches the light sidebar / white-card design system. Reads
   everything from mockStudentData.js — swap for a real data hook
   once the backend exists.
------------------------------------------------------------------- */

// ---------------- Stat card ----------------
function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
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

// ---------------- Quick action button ----------------
function QuickAction({ to, label, icon: Icon }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50/50"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
    </Link>
  );
}

// ---------------- Complaint row (matches My Complaints row style) ----------------
function ComplaintRow({ complaint }) {
  return (
    <Link
      to={`/student/complaints/${complaint.id}`}
      className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-slate-50"
    >
      <CategoryIcon category={complaint.category} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{complaint.title}</p>
        <p className="text-xs text-slate-400">{complaint.id} • {complaint.location}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <StatusBadge status={complaint.status} />
        <PriorityBadge priority={complaint.priority} />
      </div>
    </Link>
  );
}

export default function StudentDashboardPage() {
  const counts = getComplaintCounts(mockComplaints);

  const recentlySubmitted = [...mockComplaints]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 3);

  const recentlyUpdated = [...mockComplaints]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const recentNotifications = [...mockNotifications]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Welcome back, {mockStudent.fullName.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-slate-500">
          Here's what's happening with your complaints today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total" value={counts.total} icon={Inbox} tone="indigo" />
        <StatCard label="Pending" value={counts.pending} icon={Clock} tone="amber" />
        <StatCard label="In Progress" value={counts.inProgress} icon={Loader2} tone="sky" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Reopened" value={counts.reopened} icon={RotateCcw} tone="rose" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction to="/student/complaints/new" label="Submit Complaint" icon={PlusCircle} />
        <QuickAction to="/student/complaints" label="View My Complaints" icon={FileText} />
        <QuickAction to="/student/notifications" label="View Notifications" icon={Bell} />
        <QuickAction to="/student/profile" label="View Profile" icon={User} />
      </div>

      {/* Two-column: recent activity + notifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recently submitted */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Recently Submitted</h2>
          <div className="space-y-1">
            {recentlySubmitted.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">No complaints yet.</p>
            ) : (
              recentlySubmitted.map((c) => <ComplaintRow key={c.id} complaint={c} />)
            )}
          </div>
        </div>

        {/* Recently updated */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Recently Updated</h2>
          <div className="space-y-1">
            {recentlyUpdated.map((c) => (
              <ComplaintRow key={c.id} complaint={c} />
            ))}
          </div>
        </div>

        {/* Notifications preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Notifications</h2>
            <Link to="/student/notifications" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {recentNotifications.map((n) => (
              <div
                key={n.id}
                className={`rounded-xl border p-3 text-sm ${n.read ? "border-slate-100 bg-white" : "border-indigo-100 bg-indigo-50/60"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-slate-800">{n.title}</p>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
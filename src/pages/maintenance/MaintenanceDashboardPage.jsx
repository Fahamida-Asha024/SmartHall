import React from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Bell, Loader2, PauseCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { mockWorker, mockWorkOrders, getWorkOrderCounts } from "../../mockMaintenanceData";
import MaintenanceStatusBadge from "../../components/common/Badge/MaintenanceStatusBadge";
import PriorityBadge from "../../components/common/Badge/PriorityBadge";

function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
    sky: "bg-sky-100 text-sky-600",
    indigo: "bg-indigo-100 text-indigo-600",
    amber: "bg-amber-100 text-amber-600",
    slate: "bg-slate-100 text-slate-600",
    emerald: "bg-emerald-100 text-emerald-600",
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

export default function MaintenanceDashboardPage() {
  const counts = getWorkOrderCounts(mockWorkOrders);
  const orders = [...mockWorkOrders].sort((a, b) => new Date(a.expectedCompletion) - new Date(b.expectedCompletion));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Welcome, {mockWorker.fullName.split(" ")[0]}</h1>
        <p className="text-sm text-slate-500">Here are your assigned work orders</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="New" value={counts.new} icon={Bell} tone="sky" />
        <StatCard label="Accepted" value={counts.accepted} icon={ClipboardList} tone="indigo" />
        <StatCard label="In Progress" value={counts.inProgress} icon={Loader2} tone="amber" />
        <StatCard label="On Hold" value={counts.onHold} icon={PauseCircle} tone="slate" />
        <StatCard label="Completed" value={counts.completed} icon={CheckCircle2} tone="emerald" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        <h2 className="mb-2 px-2 text-sm font-semibold text-slate-800">My Work Orders</h2>
        <div className="divide-y divide-slate-100">
          {orders.map((wo) => (
            <div key={wo.id} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{wo.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{wo.location} • {wo.category}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {wo.id} • Due {new Date(wo.expectedCompletion).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                <MaintenanceStatusBadge status={wo.status} />
                <PriorityBadge priority={wo.priority} />
              </div>
              <Link
                to={`/maintenance/tasks/${wo.id}`}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
              >
                Open <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
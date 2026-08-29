import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { TrendingUp, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

function Bar({ label, value, total, colorClass }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-900">{value} <span className="text-gray-400 font-normal">({pct}%)</span></span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Reports() {
  const { complaints, provosts } = useApp();

  const total = complaints.length;

  // ---- Status breakdown ----
  const statusCounts = complaints.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const statusOrder = [
    ["Submitted", "bg-blue-500"],
    ["Under Review", "bg-amber-500"],
    ["In Progress", "bg-brand-500"],
    ["Resolved", "bg-teal-500"],
    ["Rejected", "bg-red-500"],
    ["Closed", "bg-gray-400"],
  ];

  // ---- Category breakdown ----
  const byCategory = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});
  const categoryColors = ["bg-brand-500", "bg-teal-500", "bg-blue-500", "bg-amber-500", "bg-purple-500", "bg-pink-500", "bg-gray-400"];

  // ---- Priority breakdown ----
  const byPriority = complaints.reduce((acc, c) => {
    acc[c.priority] = (acc[c.priority] || 0) + 1;
    return acc;
  }, {});
  const priorityOrder = [
    ["Emergency", "bg-red-500"],
    ["High", "bg-orange-500"],
    ["Medium", "bg-blue-500"],
    ["Low", "bg-gray-400"],
  ];

  // ---- Hall breakdown ----
  const byHall = complaints.reduce((acc, c) => {
    const key = c.hall || "Unspecified";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const hallColors = ["bg-brand-500", "bg-teal-500", "bg-amber-500", "bg-purple-500"];

  // ---- Provost performance ----
  const provostStats = provosts.map((p) => ({
    name: p.name,
    resolved: complaints.filter((c) => c.resolvedBy === p.name).length,
  })).sort((a, b) => b.resolved - a.resolved);
  const maxResolved = Math.max(1, ...provostStats.map((p) => p.resolved));

  // ---- Summary numbers ----
  const resolved = statusCounts["Resolved"] || 0;
  const pending = total - resolved - (statusCounts["Rejected"] || 0) - (statusCounts["Closed"] || 0);
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const emergencyPending = complaints.filter((c) => c.priority === "Emergency" && c.status !== "Resolved" && c.status !== "Closed").length;
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const topHall = Object.entries(byHall).sort((a, b) => b[1] - a[1])[0];

  return (
    <Layout
      title="Reports"
      subtitle="Complete overview of complaint activity and resolution performance"
      actions={<Button variant="ghost">Export report</Button>}
    >
      {/* Summary stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Card className="p-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center mb-3 shadow-sm">
            <TrendingUp className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-xs text-gray-400 font-medium mb-1">Total complaints</div>
          <div className="text-2xl font-bold text-gray-900">{total}</div>
        </Card>
        <Card className="p-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center mb-3 shadow-sm">
            <CheckCircle2 className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-xs text-gray-400 font-medium mb-1">Resolution rate</div>
          <div className="text-2xl font-bold text-gray-900">{resolutionRate}%</div>
        </Card>
        <Card className="p-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center mb-3 shadow-sm">
            <Clock className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-xs text-gray-400 font-medium mb-1">Currently pending</div>
          <div className="text-2xl font-bold text-gray-900">{pending}</div>
        </Card>
        <Card className="p-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center mb-3 shadow-sm">
            <AlertTriangle className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-xs text-gray-400 font-medium mb-1">Emergency unresolved</div>
          <div className="text-2xl font-bold text-gray-900">{emergencyPending}</div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Status breakdown */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Status breakdown</h3>
          <div className="space-y-3.5">
            {statusOrder.map(([status, color]) => (
              <Bar key={status} label={status} value={statusCounts[status] || 0} total={total} colorClass={color} />
            ))}
          </div>
        </Card>

        {/* Priority breakdown */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Priority breakdown</h3>
          <div className="space-y-3.5">
            {priorityOrder.map(([priority, color]) => (
              <Bar key={priority} label={priority} value={byPriority[priority] || 0} total={total} colorClass={color} />
            ))}
          </div>
        </Card>

        {/* Category breakdown */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Category breakdown</h3>
          <div className="space-y-3.5">
            {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, count], i) => (
              <Bar key={cat} label={cat} value={count} total={total} colorClass={categoryColors[i % categoryColors.length]} />
            ))}
          </div>
        </Card>

        {/* Hall breakdown */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Complaints by hall</h3>
          <div className="space-y-3.5">
            {Object.entries(byHall).sort((a, b) => b[1] - a[1]).map(([hall, count], i) => (
              <Bar key={hall} label={hall} value={count} total={total} colorClass={hallColors[i % hallColors.length]} />
            ))}
          </div>
        </Card>
      </div>

      {/* Provost performance */}
      <Card className="p-5 mb-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Provost performance — complaints resolved</h3>
        {provostStats.length === 0 ? (
          <p className="text-sm text-gray-400">এখনো কোনো provost নেই।</p>
        ) : (
          <div className="space-y-3.5">
            {provostStats.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-32 text-sm text-gray-600 truncate shrink-0">{p.name}</div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-400"
                    style={{ width: `${(p.resolved / maxResolved) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-sm font-semibold text-gray-900 text-right shrink-0">{p.resolved}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      
    </Layout>
  );
}
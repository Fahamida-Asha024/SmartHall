import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";
import {
  mockComplaintsByCategory,
  mockComplaintsByPriority,
  mockComplaintsOverTime,
  mockResolutionStats,
  mockSystemComplaintCounts,
} from "../../../mockAdminData";
import DateRangePicker from "../../../components/common/DateRangePicker";

/* ------------------------------------------------------------------
   HallMate — System-Wide Reports (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Requires: npm install recharts
   Reuses DateRangePicker from common components. Date/category/
   priority/status filters are wired to local state but don't yet
   re-slice the mock chart data — hook that up once real data exists.
------------------------------------------------------------------- */

const COLORS = ["#6366f1", "#0ea5e9", "#f59e0b", "#ef4444", "#10b981", "#a855f7", "#f97316", "#84cc16"];

function StatBlock({ label, value, suffix = "" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
      <p className="text-2xl font-bold text-slate-900">{value}{suffix}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold text-slate-800">{title}</h2>
      <div className="h-64">{children}</div>
    </div>
  );
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const stats = mockResolutionStats;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">System-wide complaint statistics across all halls</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      {/* Date range filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
        />
      </div>

      {/* Summary stat blocks */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBlock label="Total Complaints" value={mockSystemComplaintCounts.total} />
        <StatBlock label="Resolution Rate" value={stats.resolutionRate} suffix="%" />
        <StatBlock label="Avg. Resolution Time" value={stats.avgResolutionTimeDays} suffix=" days" />
        <StatBlock label="Reopened Rate" value={stats.reopenedRate} suffix="%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Complaints by Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockComplaintsByCategory} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="category" width={80} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Complaints by Priority">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockComplaintsByPriority}
                dataKey="count"
                nameKey="priority"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {mockComplaintsByPriority.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Complaints Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockComplaintsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="submitted" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Resolved vs Unresolved">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Resolved/Closed", value: mockSystemComplaintCounts.resolved + mockSystemComplaintCounts.closed },
                  { name: "Unresolved", value: mockSystemComplaintCounts.pending + mockSystemComplaintCounts.inProgress + mockSystemComplaintCounts.reopened },
                ]}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
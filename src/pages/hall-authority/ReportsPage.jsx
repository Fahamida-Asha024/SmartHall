import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  mockHallComplaintsByCategory, mockHallComplaintsByPriority, mockHallComplaintsOverTime,
  mockHallResolutionStats, mockStaffWorkload, mockHallAuthority,
} from "../../mockHallAuthorityData";

/* ------------------------------------------------------------------
   HallMate — Reports (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-11: hall-scoped only — no cross-hall / system-wide data,
   unlike Admin's ReportsPage.
------------------------------------------------------------------- */

const COLORS = ["#6366f1", "#0ea5e9", "#f59e0b", "#ef4444", "#10b981", "#a855f7"];

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">{mockHallAuthority.hall} — complaint and maintenance statistics</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatBlock label="Resolution Rate" value={mockHallResolutionStats.resolutionRate} suffix="%" />
        <StatBlock label="Avg. Resolution Time" value={mockHallResolutionStats.avgResolutionTimeDays} suffix=" days" />
        <StatBlock label="Overdue Rate" value={mockHallResolutionStats.overdueRate} suffix="%" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Complaints by Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHallComplaintsByCategory} layout="vertical" margin={{ left: 20 }}>
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
              <Pie data={mockHallComplaintsByPriority} dataKey="count" nameKey="priority" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {mockHallComplaintsByPriority.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Complaints Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHallComplaintsOverTime}>
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

        <ChartCard title="Maintenance Staff Workload">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockStaffWorkload} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="active" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
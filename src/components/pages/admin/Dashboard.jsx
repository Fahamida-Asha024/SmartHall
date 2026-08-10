import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import StatusBadge from "../../StatusBadge";

export default function Dashboard() {
  const { complaints } = useApp();

  const counts = {
    total: complaints.length,
    awaiting: complaints.filter((c) => c.status === "Submitted").length,
    progress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const recent = complaints.slice(0, 5);

  return (
    <Layout title="Dashboard" subtitle="Overview of hall complaints">
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
  ["Total complaints", counts.total, "from-brand-500 to-brand-400"],
  ["Open", counts.open, "from-blue-500 to-blue-400"],
  ["In progress", counts.progress, "from-amber-500 to-amber-400"],
  ["Resolved", counts.resolved, "from-teal-500 to-teal-400"],
].map(([label, value, grad]) => (
  <Card key={label} className="p-5">
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${grad} mb-3 shadow-sm`} />
    <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
    <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
  </Card>
))}
      </div>

      <h2 className="text-base font-semibold mb-3">Recent complaints</h2>
      <Card className="divide-y divide-gray-100">
        {recent.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="font-mono font-bold">{c.id}</span>
            <span className="flex-1 px-4">{c.title}</span>
            <StatusBadge status={c.status} />
          </div>
        ))}
      </Card>
    </Layout>
  );
}
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import StatusBadge from "../../StatusBadge";
import PriorityBadge from "../../PriorityBadge";
import CategoryIcon from "../../CategoryIcon";

export default function MyComplaints() {
  const { complaints } = useApp();
  const navigate = useNavigate();
  // Showing all complaints for this demo; once the backend is wired up,
  // filter by the logged-in student's ID instead.
  const mine = complaints;

  const counts = {
    total: mine.length,
    open: mine.filter((c) => c.status === "Submitted").length,
    progress: mine.filter((c) => c.status === "In Progress" || c.status === "Under Review").length,
    resolved: mine.filter((c) => c.status === "Resolved").length,
  };

  return (
    <Layout
      title="My complaints"
      subtitle="Track the complaints you've submitted"
      actions={<Button onClick={() => navigate("/complaints/new")}>+ New complaint</Button>}
    >
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

      <div className="space-y-2.5">
        {mine.length === 0 && <p className="text-sm text-gray-500">No complaints available.</p>}
        {mine.map((c) => (
          <Card key={c.id} className="grid grid-cols-[100px_1fr_180px_140px] items-stretch overflow-hidden">
            <div className="border-r border-dashed border-gray-300 flex flex-col items-center justify-center py-3.5 bg-gray-50">
              <span className="font-mono text-[10px] text-gray-400">TICKET</span>
              <span className="font-mono text-sm font-bold">{c.id}</span>
            </div>
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-1.5 font-semibold text-sm mb-1">
                <CategoryIcon category={c.category} className="w-3.5 h-3.5 text-gray-400" />
                {c.title}
              </div>
              <div className="text-xs text-gray-500">{c.category} · Submitted {c.submittedAt}</div>
            </div>
            <div className="flex items-center px-3">
              <PriorityBadge priority={c.priority} />
            </div>
            <div className="flex items-center justify-center px-3">
              <StatusBadge status={c.status} />
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
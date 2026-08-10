import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

export default function Reports() {
  const { complaints } = useApp();

  const byCategory = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout title="Reports" subtitle="Complaint breakdown by category" actions={<Button variant="ghost">Export report</Button>}>
      <Card className="divide-y divide-gray-100">
        {Object.entries(byCategory).map(([cat, count]) => (
          <div key={cat} className="flex items-center justify-between px-4 py-3 text-sm">
            <span>{cat}</span>
            <span className="font-semibold">{count}</span>
          </div>
        ))}
      </Card>
    </Layout>
  );
}
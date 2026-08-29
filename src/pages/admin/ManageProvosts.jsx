import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function ManageProvosts() {
  const { provosts, complaints, addProvost, removeProvost } = useApp();
  const [form, setForm] = useState({ id: "", name: "" });
  const [error, setError] = useState("");

  const resolvedCount = (name) => complaints.filter((c) => c.resolvedBy === name).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return setError("ID আর নাম দুটোই দিতে হবে");
    const res = addProvost(form);
    if (!res.ok) return setError("এই ID আগে থেকেই আছে");
    setForm({ id: "", name: "" });
    setError("");
  };

  return (
    <Layout title="Manage provosts" subtitle="Add or remove provost accounts">
      <Card className="max-w-md p-5 mb-6">
        <h3 className="text-sm font-semibold mb-3">Add new provost</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <Input label="Provost ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="PRV-2" />
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Name" />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit">Add provost</Button>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="text-left px-4 py-2.5">Provost ID</th>
              <th className="text-left px-4 py-2.5">Name</th>
              <th className="text-left px-4 py-2.5">Complaints resolved</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {provosts.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-mono font-bold">{p.id}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{resolvedCount(p.name)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (confirm(`${p.name} কে remove করতে চাও?`)) removeProvost(p.id);
                    }}
                    className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
}
import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import StatusBadge from "../../StatusBadge";
import PriorityBadge from "../../PriorityBadge";

const STATUSES = ["Submitted", "Under Review", "In Progress", "Resolved", "Rejected", "Closed"];

export default function AllComplaints() {
  const { complaints, updateComplaintStatus, markComplaintSeen, user } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [nextStatus, setNextStatus] = useState("");

  const filtered = complaints.filter((c) => {
    const matchesSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const startEdit = (c) => {
    setEditingId(c.id);
    setRemarks(c.remarks || "");
    setNextStatus(c.status);
    if (!c.seen) markComplaintSeen(c.id);
  };
  const saveEdit = () => { updateComplaintStatus(editingId, nextStatus, remarks); setEditingId(null); };

  return (
    <Layout title="All complaints" subtitle="Search, filter and update complaint status">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-2.5 p-4 border-b border-gray-100">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ticket ID or title" className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>All</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No complaints available.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase bg-gray-50">
                <th className="text-left px-4 py-2.5">Id</th>
                <th className="text-left px-4 py-2.5">Title</th>
                <th className="text-left px-4 py-2.5">Student</th>
                <th className="text-left px-4 py-2.5">Priority</th>
                <th className="text-left px-4 py-2.5">Status</th>
                <th className="text-left px-4 py-2.5">Resolved by</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className={`border-t border-gray-100 ${!c.seen ? "bg-brand-50/40" : ""}`}>
                  <td className="px-4 py-3 font-mono font-bold">
                    {!c.seen && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />}
                    {c.id}
                  </td>
                  <td className="px-4 py-3">{c.title}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{c.resolvedBy || "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => startEdit(c)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {editingId && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center">
          <Card className="w-[420px] p-5">
            <h3 className="text-sm font-semibold mb-3">Update status — {editingId}</h3>
            <select value={nextStatus} onChange={(e) => setNextStatus(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add remarks (optional)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4" rows={3} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingId(null)} className="text-sm px-4 py-2 border border-gray-200 rounded-lg">Cancel</button>
              <button onClick={saveEdit} className="text-sm px-4 py-2 bg-brand-600 text-white rounded-lg">Save changes</button>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
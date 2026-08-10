import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

const CATEGORIES = ["Plumbing", "Electrical", "Sanitation", "Furniture", "Internet", "Other"];
const PRIORITIES = ["Low", "Medium", "High", "Emergency"];

export default function SubmitComplaint() {
  const { addComplaint } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], priority: PRIORITIES[0], block: "", room: "", description: "", attachment: null });
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.type === "file" ? e.target.files[0] : e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("Only JPG, JPEG and PNG files are allowed.");
      return;
    }
    setError("");
    setForm({ ...form, attachment: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.block || !form.room) {
      setError("Please fill in all required fields.");
      return;
    }
    // TODO: replace with real API call (POST /api/complaints, multipart/form-data for attachment)
    addComplaint(form);
    navigate("/complaints");
  };

  return (
    <Layout title="New complaint" subtitle="Submit a complaint about your hall">
      <Card className="max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input label="Title" value={form.title} onChange={update("title")} placeholder="Leaking faucet in room 214" />

          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={form.category} onChange={update("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select label="Priority" value={form.priority} onChange={update("priority")}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Block" value={form.block} onChange={update("block")} placeholder="Block A" />
            <Input label="Room number" value={form.room} onChange={update("room")} placeholder="214" />
          </div>

          <Textarea label="Description" value={form.description} onChange={update("description")} placeholder="Describe what's wrong and when it started" />

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Attachment (optional)</label>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFile} className="w-full text-sm border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50" />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={() => navigate("/complaints")}>Cancel</Button>
            <Button type="submit">Submit complaint</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
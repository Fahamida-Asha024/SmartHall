import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { Pencil } from "lucide-react";

const HALLS = ["Sadhinota Hall", "Bijoy Hall", "Shaheed Smrity Hall"];
const BLOCKS = ["A", "B", "C"];

export default function Profile() {
  const { user, updateProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    hall: user?.hall || HALLS[0],
    block: user?.block || BLOCKS[0],
    room: user?.room || "",
  });
  const [saved, setSaved] = useState(false);

  const startEdit = () => {
    setForm({ hall: user?.hall || HALLS[0], block: user?.block || BLOCKS[0], room: user?.room || "" });
    setSaved(false);
    setEditing(true);
  };

  const handleSave = () => {
    updateProfile(user.id, form);
    setEditing(false);
    setSaved(true);
  };

  return (
    <Layout title="My profile" subtitle="View and update your hall details">
      <Card className="max-w-lg p-6">
        <div className="space-y-3.5">
          <Input label="Full name" value={user?.name || ""} disabled />
          <Input label="Student ID" value={user?.id || ""} disabled />

          <div className="grid grid-cols-2 gap-3">
            {editing ? (
              <Select label="Hall" value={form.hall} onChange={(e) => setForm({ ...form, hall: e.target.value })}>
                {HALLS.map((h) => <option key={h}>{h}</option>)}
              </Select>
            ) : (
              <Input label="Hall" value={user?.hall || "—"} disabled />
            )}

            {editing ? (
              <Select label="Block" value={form.block} onChange={(e) => setForm({ ...form, block: e.target.value })}>
                {BLOCKS.map((b) => <option key={b}>{b}</option>)}
              </Select>
            ) : (
              <Input label="Block" value={user?.block || "—"} disabled />
            )}
          </div>

          {editing ? (
            <Input label="Room number" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="214" />
          ) : (
            <Input label="Room number" value={user?.room || "—"} disabled />
          )}

          {saved && <p className="text-xs text-teal-600">প্রোফাইল আপডেট হয়েছে ✓</p>}

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            {editing ? (
              <>
                <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save changes</Button>
              </>
            ) : (
              <Button variant="ghost" onClick={startEdit}>
                <Pencil className="w-3.5 h-3.5 inline mr-1.5" /> Edit profile
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Layout>
  );
}
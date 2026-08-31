import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { mockHalls } from "../../mockAdminData";

/* ------------------------------------------------------------------
   Shared create/edit form for Users, Hall Authorities, and
   Maintenance Staff. `fixedRole` locks the role field when opened
   from a role-specific page (Hall Authority / Maintenance Staff
   management); left undefined on the general User Management page
   so any role can be picked.
------------------------------------------------------------------- */

const ALL_ROLES = ["Student", "Hall Authority", "Maintenance Staff", "Admin"];

export default function CreateEditUserModal({ open, initialUser, fixedRole, onSave, onClose }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(fixedRole || "Student");
  const [hall, setHall] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (open) {
      setFullName(initialUser?.fullName || "");
      setEmail(initialUser?.email || "");
      setRole(initialUser?.role || fixedRole || "Student");
      setHall(initialUser?.hall || "");
      setStatus(initialUser?.status || "Active");
    }
  }, [open, initialUser, fixedRole]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    onSave({
      ...initialUser,
      fullName: fullName.trim(),
      email: email.trim(),
      role,
      hall: role === "Hall Authority" ? hall : null,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">
            {initialUser?.id ? "Edit User" : "Create User"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="e.g. Karim Uddin"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="name@hallmate.edu"
            />
          </div>

          {!fixedRole && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {ALL_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}

          {role === "Hall Authority" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Assigned Hall</label>
              <select
                value={hall}
                onChange={(e) => setHall(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select a hall</option>
                {mockHalls.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <p className="mt-1 text-xs text-slate-400">Each Hall Authority manages exactly one hall.</p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
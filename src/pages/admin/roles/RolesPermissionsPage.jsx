import React, { useState } from "react";
import { ShieldCheck, Check, Pencil } from "lucide-react";
import { mockRolePermissions } from "../../../mockAdminData";
import RoleBadge from "../../../components/common/Badge/RoleBadge";

/* ------------------------------------------------------------------
   HallMate — Roles & Permissions (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Displays each role's permission set from mockRolePermissions.
   "Edit" toggles a checkbox view so permissions can be turned
   on/off locally — nothing persists to a backend yet, but the UI
   demonstrates the doc's "modify permissions where appropriate"
   requirement. Reuses RoleBadge from common components.
------------------------------------------------------------------- */

const ROLE_DESCRIPTIONS = {
  Student: "Can submit and track their own complaints only.",
  "Hall Authority": "Manages complaints and maintenance for their assigned hall.",
  "Maintenance Staff": "Executes assigned maintenance work orders.",
  Admin: "Full system administration — users, roles, configuration, and monitoring.",
};

function RoleCard({ role, permissions, onTogglePermission, editing, onToggleEdit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-1 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-800">{role}</h2>
              <RoleBadge role={role} />
            </div>
            <p className="mt-0.5 text-xs text-slate-400">{ROLE_DESCRIPTIONS[role]}</p>
          </div>
        </div>
        <button
          onClick={onToggleEdit}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          <Pencil className="h-3.5 w-3.5" /> {editing ? "Done" : "Edit"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {permissions.map((perm) => (
          <label
            key={perm.label}
            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm
              ${perm.enabled ? "border-slate-100 bg-slate-50" : "border-slate-100 bg-white text-slate-400"}
              ${editing ? "cursor-pointer hover:border-indigo-200" : ""}`}
          >
            {editing ? (
              <input
                type="checkbox"
                checked={perm.enabled}
                onChange={() => onTogglePermission(perm.label)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            ) : (
              <span className={`flex h-4 w-4 items-center justify-center rounded-full ${perm.enabled ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                <Check className="h-3 w-3" />
              </span>
            )}
            <span className={perm.enabled ? "text-slate-700" : "text-slate-400 line-through"}>
              {perm.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function RolesPermissionsPage() {
  // Convert the flat permission arrays into { label, enabled } so
  // individual permissions can be toggled off without editing the
  // shared mock data file directly.
  const [permissionState, setPermissionState] = useState(() => {
    const initial = {};
    Object.entries(mockRolePermissions).forEach(([role, perms]) => {
      initial[role] = perms.map((label) => ({ label, enabled: true }));
    });
    return initial;
  });

  const [editingRole, setEditingRole] = useState(null);

  const togglePermission = (role, label) => {
    setPermissionState((prev) => ({
      ...prev,
      [role]: prev[role].map((p) => (p.label === label ? { ...p, enabled: !p.enabled } : p)),
    }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="text-sm text-slate-500">
          View and configure what each role is allowed to do across the system
        </p>
      </div>

      <div className="space-y-5">
        {Object.keys(mockRolePermissions).map((role) => (
          <RoleCard
            key={role}
            role={role}
            permissions={permissionState[role]}
            editing={editingRole === role}
            onToggleEdit={() => setEditingRole(editingRole === role ? null : role)}
            onTogglePermission={(label) => togglePermission(role, label)}
          />
        ))}
      </div>
    </div>
  );
}
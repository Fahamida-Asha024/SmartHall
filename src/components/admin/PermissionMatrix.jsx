import React from "react";
import { Check } from "lucide-react";
import RoleBadge from "./Badge/RoleBadge";

/* ------------------------------------------------------------------
   Checkbox grid: every unique permission as a row, every role as a
   column. Pass rolePermissions in the shape used by mockAdminData.js:
     { Student: ["perm1", "perm2"], "Hall Authority": [...], ... }

   editable=true turns cells into real checkboxes; onToggle(role, perm)
   fires when one is clicked.
------------------------------------------------------------------- */

export default function PermissionMatrix({ rolePermissions, editable = false, onToggle }) {
  const roles = Object.keys(rolePermissions);
  const allPermissions = [...new Set(roles.flatMap((r) => rolePermissions[r]))];

  const hasPermission = (role, perm) => rolePermissions[role].includes(perm);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="sticky left-0 bg-white px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Permission
            </th>
            {roles.map((role) => (
              <th key={role} className="px-4 py-3 text-center">
                <RoleBadge role={role} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {allPermissions.map((perm) => (
            <tr key={perm} className="hover:bg-slate-50">
              <td className="sticky left-0 bg-white px-4 py-3 text-slate-700">{perm}</td>
              {roles.map((role) => {
                const enabled = hasPermission(role, perm);
                return (
                  <td key={role} className="px-4 py-3 text-center">
                    {editable ? (
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => onToggle?.(role, perm)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    ) : enabled ? (
                      <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="mx-auto block h-1 w-4 rounded-full bg-slate-200" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
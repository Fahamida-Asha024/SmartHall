import React from "react";
import { MoreVertical, Eye, Pencil, Power, Trash2, KeyRound } from "lucide-react";
import RoleBadge from "../common/Badge/RoleBadge";
import AccountStatusBadge from "../common/Badge/AccountStatusBadge";

/* ------------------------------------------------------------------
   Reusable user table — used by:
   - UserManagementPage (all roles)
   - HallAuthorityManagementPage (filtered to Hall Authority)
   - MaintenanceStaffManagementPage (filtered to Maintenance Staff)
------------------------------------------------------------------- */

export default function UserTable({
  users,
  showHallColumn = true,
  onView,
  onEdit,
  onToggleStatus,
  onResetPassword,
  onDelete,
}) {
  const [openMenuId, setOpenMenuId] = React.useState(null);

  if (users.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-slate-400">
        No users match your search or filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            {showHallColumn && <th className="px-4 py-3 font-medium">Hall</th>}
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Last Active</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((u) => (
            <tr key={u.id} className="transition hover:bg-slate-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {u.fullName.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-800">{u.fullName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-500">{u.email}</td>
              <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
              {showHallColumn && (
                <td className="px-4 py-3 text-slate-500">{u.hall || "—"}</td>
              )}
              <td className="px-4 py-3"><AccountStatusBadge status={u.status} /></td>
              <td className="px-4 py-3 text-xs text-slate-400">
                {new Date(u.lastActive).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </td>
              <td className="relative px-4 py-3 text-right">
                <button
                  onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {openMenuId === u.id && (
                  <div
                    className="absolute right-4 top-10 z-10 w-44 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg"
                    onMouseLeave={() => setOpenMenuId(null)}
                  >
                    <button onClick={() => { onView?.(u); setOpenMenuId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>
                    <button onClick={() => { onEdit?.(u); setOpenMenuId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => { onResetPassword?.(u); setOpenMenuId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <KeyRound className="h-3.5 w-3.5" /> Reset Password
                    </button>
                    <button onClick={() => { onToggleStatus?.(u); setOpenMenuId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <Power className="h-3.5 w-3.5" /> {u.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => { onDelete?.(u); setOpenMenuId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
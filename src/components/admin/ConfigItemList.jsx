import React from "react";
import { Plus, Pencil, Trash2, Power } from "lucide-react";

/* ------------------------------------------------------------------
   Generic CRUD list — used by CategoriesPage, PrioritiesPage, and
   StatusesPage so the add/edit/toggle/delete pattern is written
   once and shared, not copy-pasted three times.
------------------------------------------------------------------- */

export default function ConfigItemList({
  title,
  subtitle,
  items,
  showDescription = true,
  onAdd,
  onEdit,
  onToggleActive,
  onDelete,
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">Nothing here yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide
                        ${item.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {showDescription && item.description && (
                    <p className="mt-0.5 text-xs text-slate-400">{item.description}</p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => onToggleActive(item)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    title={item.active ? "Deactivate" : "Activate"}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
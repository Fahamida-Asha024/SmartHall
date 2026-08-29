import React from "react";
import { NavLink } from "react-router-dom";
import { LogOut, Building2, X } from "lucide-react";

export function SidebarContent({ items, portalLabel, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">HallMate</p>
          <p className="text-xs text-slate-400">{portalLabel}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${isActive ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-3 py-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ items, portalLabel, mobileOpen, onClose, onLogout }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 bg-slate-900 md:block">
        <SidebarContent items={items} portalLabel={portalLabel} onLogout={onLogout} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative z-50 h-full w-64 bg-slate-900">
            <button onClick={onClose} className="absolute right-3 top-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <SidebarContent items={items} portalLabel={portalLabel} onNavigate={onClose} onLogout={onLogout} />
          </aside>
        </div>
      )}
    </>
  );
}
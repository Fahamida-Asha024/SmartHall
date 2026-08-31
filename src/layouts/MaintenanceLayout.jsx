import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Bell,
  LogOut,
  Building2,
  Menu,
  X,
  Clock3,
} from "lucide-react";
import { mockWorker } from "../mockMaintenanceData";

const NAV_ITEMS = [
  {
    to: "/maintenance/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/maintenance/history",
    label: "Work History",
    icon: Clock3,
  },
  {
    to: "/maintenance/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    to: "/maintenance/profile",
    label: "Profile",
    icon: User,
  },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      
      {/* ==================== LOGO ==================== */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
          <Building2 className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            HallMate
          </p>

          <p className="text-xs text-slate-400">
            Maintenance Portal
          </p>
        </div>
      </div>

      {/* ==================== NAVIGATION ==================== */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* ==================== LOGOUT ==================== */}
      <div className="border-t border-slate-800 px-3 py-4">
        <button
          onClick={() => (window.location.href = "/login")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function MaintenanceLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <aside className="hidden w-64 shrink-0 bg-slate-900 md:block">
        <SidebarContent />
      </aside>

      {/* ==================== MOBILE SIDEBAR ==================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside className="relative z-50 h-full w-64 bg-slate-900">

            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>

            <SidebarContent
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex min-h-screen flex-1 flex-col">

        {/* ==================== TOP NAVBAR ==================== */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-500 hover:text-slate-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Portal Name */}
          <div className="hidden text-sm font-medium text-slate-500 md:block">
            Maintenance Portal
          </div>

          {/* Worker Information */}
          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
              {mockWorker.fullName.charAt(0)}
            </div>

            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {mockWorker.fullName}
            </span>

          </div>
        </header>

        {/* ==================== PAGE CONTENT ==================== */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
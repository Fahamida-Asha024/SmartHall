import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  Bell,
  LogOut,
  Building2,
  Menu,
  X,
} from "lucide-react";

import { mockStudent, mockNotifications } from "../mockStudentData";

const NAV_ITEMS = [
  {
    to: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/student/complaints",
    label: "My Complaints",
    icon: FileText,
  },
  {
    to: "/student/complaints/new",
    label: "Submit Complaint",
    icon: PlusCircle,
  },
  {
    to: "/student/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/student/notifications",
    label: "Notifications",
    icon: Bell,
  },
];

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hallmate_role");
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col bg-white">

      {/* ================= LOGO ================= */}

      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-2.5">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              HallMate
            </p>

            <p className="text-xs text-slate-400">
              Student Portal
            </p>
          </div>

        </div>
      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 space-y-1 px-3 py-5">

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition
                ${
                  isActive
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />

              <span>{item.label}</span>

              {item.label === "Notifications" &&
                mockNotifications.filter((n) => !n.read).length > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-100 px-1.5 text-[10px] font-semibold text-rose-600">
                    {mockNotifications.filter((n) => !n.read).length}
                  </span>
                )}
            </NavLink>
          );
        })}

      </nav>

      {/* ================= LOGOUT ================= */}

      <div className="border-t border-slate-200 px-3 py-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

      </div>
    </div>
  );
}

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = mockNotifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
        <SidebarContent />
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative z-50 h-full w-64 bg-white shadow-xl">

            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <SidebarContent
              onNavigate={() => setMobileOpen(false)}
            />

          </aside>

        </div>
      )}

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">

        {/* ================= HEADER ================= */}

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop title */}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-500">
              Student Portal
            </p>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">

            {/* Notifications */}

            <NavLink
              to="/student/notifications"
              className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>

            {/* Divider */}

            <div className="h-8 w-px bg-slate-200" />

            {/* Profile */}

            <NavLink
              to="/student/profile"
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                {mockStudent.fullName?.charAt(0) || "S"}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {mockStudent.fullName}
                </p>

                <p className="text-xs text-slate-400">
                  Student
                </p>
              </div>

            </NavLink>

          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

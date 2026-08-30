import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Tags,
  Gauge,
  Bell,
  Settings,
  User,
  LogOut,
  Building2,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { mockAdmin } from "../mockAdminData";

/* ================================================================
   HallMate — Admin Layout
   ================================================================

   Admin is the System Administrator.

   Admin responsibilities:
   - Manage users
   - Manage roles & permissions
   - Manage Hall Authority accounts
   - Manage Maintenance Staff accounts
   - Manage complaint categories
   - Manage complaint priorities
   - Manage complaint statuses
   - Monitor reports
   - View activity logs
   - Configure notifications
   - Configure system settings

   Day-to-day complaint and maintenance operations are handled
   by the Hall Authority and Maintenance Staff roles.
================================================================ */

/* ================================================================
   ADMIN NAVIGATION
================================================================ */

const NAV_SECTIONS = [
  {
    type: "single",
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    type: "group",
    label: "User Management",
    icon: Users,
    items: [
      {
        to: "/admin/users",
        label: "Users",
      },
      {
        to: "/admin/roles-permissions",
        label: "Roles & Permissions",
      },
      {
        to: "/admin/hall-authorities",
        label: "Hall Authorities",
      },
      {
        to: "/admin/maintenance-staff",
        label: "Maintenance Staff",
      },
    ],
  },

  {
    type: "group",
    label: "Complaint System",
    icon: Tags,
    items: [
      {
        to: "/admin/categories",
        label: "Categories",
      },
      {
        to: "/admin/priorities",
        label: "Priorities",
      },
      {
        to: "/admin/statuses",
        label: "Statuses",
      },
    ],
  },

  {
    type: "group",
    label: "Monitoring",
    icon: Gauge,
    items: [
      {
        to: "/admin/reports",
        label: "Reports",
      },
      {
        to: "/admin/activity-log",
        label: "Activity Log",
      },
    ],
  },

  {
    type: "group",
    label: "System",
    icon: Settings,
    items: [
      {
        to: "/admin/notification-settings",
        label: "Notification Settings",
      },
      {
        to: "/admin/system-settings",
        label: "System Settings",
      },
    ],
  },

  {
    type: "group",
    label: "Account",
    icon: User,
    items: [
      {
        to: "/admin/notifications",
        label: "Notifications",
      },
      {
        to: "/admin/profile",
        label: "Profile",
      },
    ],
  },
];

/* ================================================================
   COLLAPSIBLE NAVIGATION GROUP
================================================================ */

function NavGroup({ section, onNavigate }) {
  const [open, setOpen] = useState(true);

  const Icon = section.icon;

  return (
    <div>
      {/* Group header */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        <Icon className="h-4 w-4 shrink-0" />

        <span className="flex-1 text-left">
          {section.label}
        </span>

        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Group items */}
      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-800 pl-4">
          {section.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-slate-700 font-medium text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   SIDEBAR CONTENT
================================================================ */

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">

      {/* ----------------------------------------------------------
          Logo / Brand
      ---------------------------------------------------------- */}

      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700">
          <Building2 className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            HallMate
          </p>

          <p className="text-xs text-slate-400">
            System Administration
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------
          Navigation
      ---------------------------------------------------------- */}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_SECTIONS.map((section) => {
          if (section.type === "single") {
            return (
              <NavLink
                key={section.to}
                to={section.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <section.icon className="h-4 w-4 shrink-0" />

                {section.label}
              </NavLink>
            );
          }

          return (
            <NavGroup
              key={section.label}
              section={section}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>

      {/* ----------------------------------------------------------
          Logout
      ---------------------------------------------------------- */}

      <div className="border-t border-slate-800 px-3 py-4">
        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />

          Logout
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   ADMIN LAYOUT
================================================================ */

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ==========================================================
          DESKTOP SIDEBAR
      ========================================================== */}

      <aside className="hidden w-72 shrink-0 bg-slate-900 md:block">
        <SidebarContent />
      </aside>

      {/* ==========================================================
          MOBILE SIDEBAR
      ========================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative z-50 h-full w-72 bg-slate-900">

            {/* Close button */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 text-slate-400 transition hover:text-white"
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

      {/* ==========================================================
          MAIN CONTENT AREA
      ========================================================== */}

      <div className="flex min-h-screen flex-1 flex-col">

        {/* --------------------------------------------------------
            TOP NAVBAR
        -------------------------------------------------------- */}

        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-slate-500 transition hover:text-slate-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Admin Console label */}
          <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 md:flex">
            <ShieldCheck className="h-4 w-4 text-slate-400" />

            <span>Admin Console</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {/* Notifications */}
            <NavLink
              to="/admin/notifications"
              className="relative text-slate-500 transition hover:text-slate-700"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />

              {/* Notification indicator */}
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
            </NavLink>

            {/* Admin profile */}
            <NavLink
              to="/admin/profile"
              className="flex items-center gap-2"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
                {mockAdmin.fullName?.charAt(0)?.toUpperCase() || "A"}
              </div>

              {/* Admin information */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-700">
                  {mockAdmin.fullName}
                </p>

                <p className="text-xs text-slate-400">
                  {mockAdmin.designation}
                </p>
              </div>
            </NavLink>
          </div>
        </header>

        {/* --------------------------------------------------------
            PAGE CONTENT
        -------------------------------------------------------- */}

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
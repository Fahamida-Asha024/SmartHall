import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Wrench, Gauge, Bell, User, LogOut,
  Building2, Menu, X, ChevronDown,
} from "lucide-react";
import { mockHallAuthority } from "../mockHallAuthorityData";

const NAV_SECTIONS = [
  { type: "single", to: "/hall-authority/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    type: "group", label: "Complaints", icon: MessageSquare,
    items: [
      { to: "/hall-authority/complaints", label: "All Complaints" },
      { to: "/hall-authority/complaints/pending", label: "Pending Review" },
      { to: "/hall-authority/complaints?priority=High", label: "High Priority" },
    ],
  },
  {
    type: "group", label: "Maintenance", icon: Wrench,
    items: [
      { to: "/hall-authority/work-orders", label: "Work Orders" },
      { to: "/hall-authority/assign-work", label: "Assign Work" },
      { to: "/hall-authority/completed-work", label: "Completed Work" },
    ],
  },
  {
    type: "group", label: "Monitoring", icon: Gauge,
    items: [{ to: "/hall-authority/reports", label: "Reports" }],
  },
  { type: "single", to: "/hall-authority/notifications", label: "Notifications", icon: Bell },
  { type: "single", to: "/hall-authority/profile", label: "Profile", icon: User },
];

function NavGroup({ section, onNavigate }) {
  const [open, setOpen] = useState(true);
  const Icon = section.icon;
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((c) => !c)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{section.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-4">
          {section.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              end
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition ${isActive ? "bg-purple-50 font-medium text-purple-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`
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

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("hallmate_role");
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">HallMate</p>
            <p className="text-xs text-slate-400">Hall Authority Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {NAV_SECTIONS.map((section) => {
          if (section.type === "single") {
            return (
              <NavLink
                key={section.to}
                to={section.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-purple-50 text-purple-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`
                }
              >
                <section.icon className="h-4 w-4 shrink-0" />
                {section.label}
              </NavLink>
            );
          }
          return <NavGroup key={section.label} section={section} onNavigate={onNavigate} />;
        })}
      </nav>

      <div className="border-t border-slate-200 px-3 py-4">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
}

export default function HallAuthorityLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white md:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 h-full w-72 bg-white shadow-xl">
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-500">{mockHallAuthority.hall}</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <NavLink to="/hall-authority/notifications" className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <Bell className="h-5 w-5" />
            </NavLink>
            <div className="h-8 w-px bg-slate-200" />
            <NavLink to="/hall-authority/profile" className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-slate-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                {mockHallAuthority.fullName.charAt(0)}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800">{mockHallAuthority.fullName}</p>
                <p className="text-xs text-slate-400">Hall Authority</p>
              </div>
            </NavLink>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
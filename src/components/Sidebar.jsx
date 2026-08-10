import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LayoutList, FileBarChart, FilePlus2, User, LogOut, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

const studentLinks = [
  { to: "/complaints", label: "My complaints", icon: LayoutList, end: true },
  { to: "/complaints/new", label: "Submit complaint", icon: FilePlus2 },
  { to: "/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/complaints", label: "All complaints", icon: LayoutList },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
];

export default function Sidebar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const links = user?.role === "admin" ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 shrink-0 bg-gradient-to-b from-[#1e1b3a] via-[#241f42] to-[#181530] text-white flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-teal-400 rounded-xl flex items-center justify-center shrink-0 shadow-glow">
          <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold leading-tight truncate tracking-tight">Hall Complaint</div>
          <div className="text-[11px] text-brand-400/80 leading-tight font-medium">MANAGEMENT SYSTEM</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 text-[13.5px] px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-glow"
                  : "text-white/50 hover:bg-white/[0.06] hover:text-white/90"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-3 h-px bg-white/[0.08]" />

      <div className="px-3 pb-4">
        <div className="flex items-center gap-2.5 px-2 py-2 mb-1 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 text-white flex items-center justify-center text-[11px] font-bold shrink-0 ring-2 ring-white/10">
            {user?.name?.slice(0, 2).toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium truncate text-white/90">{user?.name}</div>
            <div className="text-[11px] text-white/40 capitalize">{user?.role}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-[13px] text-white/50 hover:text-red-300 px-2 py-2 rounded-xl hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    </aside>
  );
}
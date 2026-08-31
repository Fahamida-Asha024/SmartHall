import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, TrendingUp, MessageSquare } from "lucide-react";
import { mockWorkerNotifications as initialNotifications } from "../../mockMaintenanceData";
import SettingsTabs from "../../components/admin/SettingsTabs";

/* ------------------------------------------------------------------
   HallMate — Maintenance Notifications (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Covers requirement 9: notify Maintenance Staff when a new work
   order is assigned (plus priority changes / new instructions, since
   those matter to a worker too). Same pattern as Student/Admin
   notifications — reuses SettingsTabs.
------------------------------------------------------------------- */

const TYPE_CONFIG = {
  default: { icon: ClipboardList, bg: "bg-sky-100", color: "text-sky-600" },
};

function iconFor(title) {
  if (title.includes("Priority")) return { icon: TrendingUp, bg: "bg-amber-100", color: "text-amber-600" };
  if (title.includes("Instruction")) return { icon: MessageSquare, bg: "bg-indigo-100", color: "text-indigo-600" };
  return { icon: ClipboardList, bg: "bg-sky-100", color: "text-sky-600" };
}

function relativeTime(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

const TABS = ["All", "Unread", "Read"];

export default function MaintenanceNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.length - unreadCount;
  const counts = { All: notifications.length, Unread: unreadCount, Read: readCount };

  const filtered = notifications.filter((n) => {
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Read") return n.read;
    return true;
  });

  const markOneRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-slate-500">Updates about your assigned work orders</p>
      </div>

      <SettingsTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} counts={counts} />

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No notifications here.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const config = iconFor(n.title);
              const Icon = config.icon;
              return (
                <Link
                  key={n.id}
                  to={`/maintenance/tasks/${n.workOrderId}`}
                  onClick={() => markOneRead(n.id)}
                  className={`flex items-start gap-3 p-4 transition hover:bg-slate-50 ${!n.read ? "bg-indigo-50/40" : ""}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{n.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{n.message}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-xs text-slate-400">{relativeTime(n.timestamp)}</span>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-indigo-500" />}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
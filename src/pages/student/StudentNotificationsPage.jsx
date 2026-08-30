import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, UserCheck, Wrench, RotateCcw, MessageCircle, Bell as BellIcon } from "lucide-react";
import { mockNotifications as initialNotifications } from "../../mockStudentData";

/* ------------------------------------------------------------------
   HallMate — Notifications (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Local state seeded from mockNotifications so "Mark all as read"
   and per-item read toggling actually work in the demo, even though
   nothing persists after a refresh yet.
------------------------------------------------------------------- */

const TYPE_CONFIG = {
  assigned: { icon: UserCheck, bg: "bg-sky-100", color: "text-sky-600" },
  progress: { icon: Wrench, bg: "bg-amber-100", color: "text-amber-600" },
  resolved: { icon: CheckCircle2, bg: "bg-emerald-100", color: "text-emerald-600" },
  reopened: { icon: RotateCcw, bg: "bg-rose-100", color: "text-rose-600" },
  comment: { icon: MessageCircle, bg: "bg-indigo-100", color: "text-indigo-600" },
  default: { icon: BellIcon, bg: "bg-slate-100", color: "text-slate-500" },
};

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

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.length - unreadCount;

  const filtered = notifications.filter((n) => {
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Read") return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated with the latest updates</p>
        </div>
        <button
          onClick={markAllRead}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {TABS.map((tab) => {
          const count = tab === "All" ? notifications.length : tab === "Unread" ? unreadCount : readCount;
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
                ${active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab}
              <span className={`rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No notifications here.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.default;
              const Icon = config.icon;
              return (
                <Link
                  key={n.id}
                  to={n.relatedComplaintId ? `/student/complaints/${n.relatedComplaintId}` : "#"}
                  onClick={() => markOneRead(n.id)}
                  className={`flex items-start gap-3 p-4 transition hover:bg-slate-50 ${!n.read ? "bg-indigo-50/40" : ""}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{n.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{n.message}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(n.timestamp).toLocaleString(undefined, {
                        month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
                      })}
                    </p>
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
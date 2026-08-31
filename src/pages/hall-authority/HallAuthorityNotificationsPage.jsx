import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Flame, CheckCircle2, PauseCircle, RotateCcw, UserCheck, AlertTriangle, Bell as BellIcon } from "lucide-react";
import { mockHallNotifications as initialNotifications } from "../../mockHallAuthorityData";

/* ------------------------------------------------------------------
   HallMate — Notifications (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-10. Same pattern as StudentNotificationsPage.jsx.
------------------------------------------------------------------- */

const TYPE_CONFIG = {
  newComplaint: { icon: Inbox, bg: "bg-indigo-100", color: "text-indigo-600" },
  highPriority: { icon: Flame, bg: "bg-rose-100", color: "text-rose-600" },
  verification: { icon: CheckCircle2, bg: "bg-emerald-100", color: "text-emerald-600" },
  onHold: { icon: PauseCircle, bg: "bg-amber-100", color: "text-amber-600" },
  reopened: { icon: RotateCcw, bg: "bg-rose-100", color: "text-rose-600" },
  accepted: { icon: UserCheck, bg: "bg-sky-100", color: "text-sky-600" },
  overdue: { icon: AlertTriangle, bg: "bg-rose-100", color: "text-rose-600" },
  default: { icon: BellIcon, bg: "bg-slate-100", color: "text-slate-500" },
};

const TABS = ["All", "Unread", "Read"];

export default function HallAuthorityNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.length - unreadCount;

  const filtered = notifications.filter((n) => (activeTab === "Unread" ? !n.read : activeTab === "Read" ? n.read : true));

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOneRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Complaint and maintenance updates for your hall</p>
        </div>
        <button onClick={markAllRead} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Mark all as read
        </button>
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {TABS.map((tab) => {
          const count = tab === "All" ? notifications.length : tab === "Unread" ? unreadCount : readCount;
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab}
              <span className={`rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No notifications here.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.default;
              const Icon = config.icon;
              const link = n.relatedComplaintId
                ? `/hall-authority/complaints/${n.relatedComplaintId}`
                : n.relatedWorkOrderId
                ? `/hall-authority/work-orders/${n.relatedWorkOrderId}`
                : "#";
              return (
                <Link key={n.id} to={link} onClick={() => markOneRead(n.id)} className={`flex items-start gap-3 p-4 transition hover:bg-slate-50 ${!n.read ? "bg-indigo-50/40" : ""}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{n.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{n.message}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(n.timestamp).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
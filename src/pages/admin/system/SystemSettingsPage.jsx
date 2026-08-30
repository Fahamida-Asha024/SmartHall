import React, { useState } from "react";
import { Save } from "lucide-react";

/* ------------------------------------------------------------------
   HallMate — System Settings (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Three tabs per the doc: Complaint Settings, Account Settings,
   Notification Settings (general toggles, separate from the
   per-event NotificationSettingsPage). All fields are local state
   only — no persistence yet.
------------------------------------------------------------------- */

const TABS = ["Complaint Settings", "Account Settings", "Notification Settings"];

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-indigo-600" : "bg-slate-300"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function FieldRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [complaintSettings, setComplaintSettings] = useState({
    maxAttachments: 5,
    maxFileSizeMb: 5,
    allowedFormats: "JPG, PNG",
    allowReopening: true,
    reopenWindowDays: 7,
  });

  const [accountSettings, setAccountSettings] = useState({
    minPasswordLength: 8,
    requireEmailVerification: true,
    autoActivateAccounts: false,
    sessionTimeoutMinutes: 60,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    inAppNotifications: true,
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">System Settings</h1>
        <p className="text-sm text-slate-500">Configure system-wide behavior and defaults</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition
              ${activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {/* Complaint Settings */}
        {activeTab === "Complaint Settings" && (
          <div>
            <FieldRow label="Maximum Attachments" description="Max number of images per complaint">
              <input
                type="number"
                value={complaintSettings.maxAttachments}
                onChange={(e) => setComplaintSettings((s) => ({ ...s, maxAttachments: e.target.value }))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
            <FieldRow label="Maximum File Size (MB)" description="Per uploaded image">
              <input
                type="number"
                value={complaintSettings.maxFileSizeMb}
                onChange={(e) => setComplaintSettings((s) => ({ ...s, maxFileSizeMb: e.target.value }))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
            <FieldRow label="Allowed File Formats" description="Comma-separated list">
              <input
                type="text"
                value={complaintSettings.allowedFormats}
                onChange={(e) => setComplaintSettings((s) => ({ ...s, allowedFormats: e.target.value }))}
                className="w-40 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
            <FieldRow label="Allow Complaint Reopening" description="Students can reopen resolved complaints">
              <ToggleSwitch
                checked={complaintSettings.allowReopening}
                onChange={() => setComplaintSettings((s) => ({ ...s, allowReopening: !s.allowReopening }))}
              />
            </FieldRow>
            <FieldRow label="Reopen Window (days)" description="How long after resolution reopening is allowed">
              <input
                type="number"
                value={complaintSettings.reopenWindowDays}
                onChange={(e) => setComplaintSettings((s) => ({ ...s, reopenWindowDays: e.target.value }))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === "Account Settings" && (
          <div>
            <FieldRow label="Minimum Password Length">
              <input
                type="number"
                value={accountSettings.minPasswordLength}
                onChange={(e) => setAccountSettings((s) => ({ ...s, minPasswordLength: e.target.value }))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
            <FieldRow label="Require Email Verification" description="Students must verify university email at registration">
              <ToggleSwitch
                checked={accountSettings.requireEmailVerification}
                onChange={() => setAccountSettings((s) => ({ ...s, requireEmailVerification: !s.requireEmailVerification }))}
              />
            </FieldRow>
            <FieldRow label="Auto-Activate New Accounts" description="Skip manual activation step for new registrations">
              <ToggleSwitch
                checked={accountSettings.autoActivateAccounts}
                onChange={() => setAccountSettings((s) => ({ ...s, autoActivateAccounts: !s.autoActivateAccounts }))}
              />
            </FieldRow>
            <FieldRow label="Session Timeout (minutes)" description="Auto-logout after inactivity">
              <input
                type="number"
                value={accountSettings.sessionTimeoutMinutes}
                onChange={(e) => setAccountSettings((s) => ({ ...s, sessionTimeoutMinutes: e.target.value }))}
                className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </FieldRow>
          </div>
        )}

        {/* Notification Settings (general prefs, distinct from per-event page) */}
        {activeTab === "Notification Settings" && (
          <div>
            <FieldRow label="Email Notifications" description="Send notifications via email in addition to in-app">
              <ToggleSwitch
                checked={notificationPrefs.emailNotifications}
                onChange={() => setNotificationPrefs((s) => ({ ...s, emailNotifications: !s.emailNotifications }))}
              />
            </FieldRow>
            <FieldRow label="In-App Notifications" description="Show notifications inside HallMate">
              <ToggleSwitch
                checked={notificationPrefs.inAppNotifications}
                onChange={() => setNotificationPrefs((s) => ({ ...s, inAppNotifications: !s.inAppNotifications }))}
              />
            </FieldRow>
            <p className="pt-3 text-xs text-slate-400">
              To configure which specific events trigger notifications, see Notification Settings under the System menu.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Bell, Save } from "lucide-react";
import { mockNotificationSettings } from "../../../mockAdminData";

/* ------------------------------------------------------------------
   HallMate — Notification Settings (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Enable/disable which system events trigger notifications. Actual
   notifications are generated automatically by the backend based on
   these flags — this page only controls the on/off state.
------------------------------------------------------------------- */

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-indigo-600" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s)));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Notification Settings</h1>
        <p className="text-sm text-slate-500">Choose which system events generate notifications</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {settings.map((s) => (
            <div key={s.key} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Bell className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-800">{s.label}</p>
              </div>
              <ToggleSwitch checked={s.enabled} onChange={() => toggle(s.key)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-sm font-medium text-emerald-600">Settings saved</span>}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
import React from "react";

/* ------------------------------------------------------------------
   Generic tab bar for settings-style pages. Pass an array of tab
   labels (strings) and the active one; onChange fires with the new
   label when clicked. Optional `counts` object ({ label: number })
   renders a small badge next to each tab — used by notification
   inboxes (All/Unread/Read) as well as plain settings pages.
------------------------------------------------------------------- */

export default function SettingsTabs({ tabs, activeTab, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 w-fit">
      {tabs.map((tab) => {
        const active = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
              ${active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {tab}
            {counts && (
              <span className={`rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"}`}>
                {counts[tab]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
import React from "react";
import { Menu, Bell } from "lucide-react";

export default function Navbar({ title = "Dashboard", unreadCount = 0, onMenuClick, rightSlot }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-slate-500 hover:text-slate-700 md:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <div className="hidden text-sm font-medium text-slate-500 md:block">{title}</div>
      <div className="flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </button>
        {rightSlot}
      </div>
    </header>
  );
}
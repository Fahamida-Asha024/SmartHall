import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} HallMate — Hall Complaint Management System
    </footer>
  );
}
import React, { useState } from "react";
import { Camera, ChevronRight, KeyRound } from "lucide-react";
import { mockHallAuthority } from "../../mockHallAuthorityData";

/* ------------------------------------------------------------------
   HallMate — Profile (Hall Authority) (FRONTEND-ONLY)
   ------------------------------------------------------------------
   FR-HA-12: name/email/phone/picture/password editable; designation
   and assigned hall are read-only (Admin-only change).
------------------------------------------------------------------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function HallAuthorityProfilePage() {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(mockHallAuthority.phone);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <div className="relative mx-auto mb-4 h-24 w-24">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-purple-100 text-3xl font-semibold text-purple-600">
              {mockHallAuthority.profilePicture ? (
                <img src={mockHallAuthority.profilePicture} alt="" className="h-full w-full object-cover" />
              ) : (
                mockHallAuthority.fullName.charAt(0)
              )}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-600 text-white hover:bg-purple-700">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-base font-semibold text-slate-900">{mockHallAuthority.fullName}</p>
          <p className="text-sm text-slate-500">{mockHallAuthority.designation}</p>
          <p className="mt-1 text-xs text-slate-400">{mockHallAuthority.hall}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Personal Information</h2>
            <button onClick={() => setEditing((s) => !s)} className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              {editing ? "Done" : "Edit"}
            </button>
          </div>
          <InfoRow label="Full Name" value={mockHallAuthority.fullName} />
          <InfoRow label="Email" value={mockHallAuthority.email} />
          <div className="flex items-center justify-between py-1.5 text-sm">
            <span className="text-slate-500">Phone Number</span>
            {editing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-36 rounded-md border border-slate-300 px-2 py-1 text-right text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
              />
            ) : (
              <span className="font-medium text-slate-800">{phone}</span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Assignment</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">Read-only</span>
          </div>
          <InfoRow label="Designation" value={mockHallAuthority.designation} />
          <InfoRow label="Assigned Hall" value={mockHallAuthority.hall} />
          <p className="mt-2 text-xs text-slate-400">Only Admin can change your hall assignment.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Security</h2>
        <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <KeyRound className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">Change Password</p>
            <p className="text-xs text-slate-400">Update your password regularly to keep your account secure.</p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </button>
      </div>
    </div>
  );
}
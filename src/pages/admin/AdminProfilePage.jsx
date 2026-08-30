import React, { useState } from "react";
import { Camera, Pencil, KeyRound, Mail, Phone, Briefcase, ShieldCheck } from "lucide-react";
import { mockAdmin } from "../../mockAdminData";
import RoleBadge from "../../components/common/Badge/RoleBadge";
import AccountStatusBadge from "../../components/common/Badge/AccountStatusBadge";

/* ------------------------------------------------------------------
   HallMate — Admin Profile (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Same visual pattern as StudentProfilePage (hero banner + stacked
   cards) but scoped to what the doc specifies for Admin: profile
   picture, name, email, phone, designation, role, account status,
   edit profile, change password, logout. No complaint summary —
   that's intentionally student/hall-authority-specific data.
   Reuses RoleBadge and AccountStatusBadge from common components.
------------------------------------------------------------------- */

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3 last:border-b-0">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </div>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function AdminProfilePage() {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(mockAdmin.phone);

  return (
    <div className="space-y-5">
      {/* Hero banner — same treatment as Student Profile, slate-toned to match Admin's visual identity */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-white p-6 sm:p-8">
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative h-24 w-24 shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-700 text-3xl font-semibold text-white shadow-sm">
                {mockAdmin.profilePicture ? (
                  <img src={mockAdmin.profilePicture} alt="" className="h-full w-full object-cover" />
                ) : (
                  mockAdmin.fullName.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-white hover:bg-slate-800">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="text-xl font-bold text-slate-900">{mockAdmin.fullName}</h1>
                <RoleBadge role={mockAdmin.role} />
              </div>
              <p className="text-sm text-slate-500">{mockAdmin.designation}</p>
              <div className="mt-2">
                <AccountStatusBadge status={mockAdmin.accountStatus} />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 self-center rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 sm:self-start">
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stacked column: Account Information → Security */}
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Account Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Account Information</h2>
            <button
              onClick={() => setEditing((s) => !s)}
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>

          <InfoRow icon={Briefcase} label="Full Name" value={mockAdmin.fullName} />
          <InfoRow icon={Mail} label="Email" value={mockAdmin.email} />
          <div className="flex items-center justify-between border-b border-slate-50 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone className="h-4 w-4 text-slate-400" />
              Phone Number
            </div>
            {editing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-40 rounded-md border border-slate-300 px-2 py-1 text-right text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />
            ) : (
              <span className="text-sm font-medium text-slate-800">{phone}</span>
            )}
          </div>
          <InfoRow icon={Briefcase} label="Designation" value={mockAdmin.designation} />
          <InfoRow icon={ShieldCheck} label="Role" value={mockAdmin.role} />
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Security</h2>
          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <KeyRound className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Password</p>
                <p className="text-xs text-slate-400">••••••••••</p>
              </div>
            </div>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Camera, Pencil, KeyRound, Mail, Phone, Wrench } from "lucide-react";
import { mockWorker } from "../../mockMaintenanceData";

/* ------------------------------------------------------------------
   HallMate — Maintenance Staff Profile (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Same hero-banner + stacked-cards pattern as Student/Admin profiles.
   Simplified: no hall/room fields (workers aren't tied to a hall),
   no complaint summary (not their data) — just account info +
   specialty + security.
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

export default function MaintenanceProfilePage() {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(mockWorker.phone);

  return (
    <div className="space-y-5">
      {/* Hero banner — emerald toned to match MaintenanceLayout's identity */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-emerald-50 to-white p-6 sm:p-8">
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative h-24 w-24 shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100 text-3xl font-semibold text-emerald-700 shadow-sm">
                {mockWorker.profilePicture ? (
                  <img src={mockWorker.profilePicture} alt="" className="h-full w-full object-cover" />
                ) : (
                  mockWorker.fullName.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white hover:bg-emerald-700">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="text-xl font-bold text-slate-900">{mockWorker.fullName}</h1>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  Maintenance Staff
                </span>
              </div>
              <p className="text-sm text-slate-500">{mockWorker.specialty}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 self-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 sm:self-start">
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stacked column: Account Information -> Security */}
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Account Information</h2>
            <button
              onClick={() => setEditing((s) => !s)}
              className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>

          <InfoRow icon={Wrench} label="Full Name" value={mockWorker.fullName} />
          <InfoRow icon={Mail} label="Email" value={mockWorker.email} />
          <div className="flex items-center justify-between border-b border-slate-50 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone className="h-4 w-4 text-slate-400" />
              Phone Number
            </div>
            {editing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-40 rounded-md border border-slate-300 px-2 py-1 text-right text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
              />
            ) : (
              <span className="text-sm font-medium text-slate-800">{phone}</span>
            )}
          </div>
          <InfoRow icon={Wrench} label="Specialty" value={mockWorker.specialty} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Security</h2>
          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
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
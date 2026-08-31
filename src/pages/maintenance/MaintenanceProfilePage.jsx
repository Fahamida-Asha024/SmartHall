import React, { useState } from "react";
import {
  Camera,
  Pencil,
  KeyRound,
  Mail,
  Phone,
  Wrench,
} from "lucide-react";
import { mockWorker } from "../../mockMaintenanceData";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3 last:border-b-0">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </div>

      <span className="text-sm font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default function MaintenanceProfilePage() {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(mockWorker.phone);

  return (
    <div className="space-y-5">

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-emerald-50 to-white p-6 sm:p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">

            <div className="relative h-24 w-24 shrink-0">

              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100 text-3xl font-semibold text-emerald-700 shadow-sm">

                {mockWorker.profilePicture ? (
                  <img
                    src={mockWorker.profilePicture}
                    alt={mockWorker.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  mockWorker.fullName.charAt(0)
                )}

              </div>

              {/* Change Picture */}
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white transition hover:bg-emerald-700"
                aria-label="Change profile picture"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>

            </div>

            {/* Name */}
            <div className="text-center sm:text-left">

              <div className="flex flex-col items-center gap-2 sm:flex-row">

                <h1 className="text-xl font-bold text-slate-900">
                  {mockWorker.fullName}
                </h1>

                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  Maintenance Staff
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {mockWorker.specialty}
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          ACCOUNT INFORMATION
      ===================================================== */}

      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          {/* Header */}
          <div className="mb-2 flex items-center justify-between">

            <h2 className="text-sm font-semibold text-slate-800">
              Account Information
            </h2>

            <button
              type="button"
              onClick={() => setEditing((previous) => !previous)}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
            >
              <Pencil className="h-3.5 w-3.5" />

              {editing ? "Done" : "Edit"}
            </button>

          </div>

          {/* Full Name */}
          <InfoRow
            icon={Wrench}
            label="Full Name"
            value={mockWorker.fullName}
          />

          {/* Email */}
          <InfoRow
            icon={Mail}
            label="Email"
            value={mockWorker.email}
          />

          {/* Phone */}
          <div className="flex items-center justify-between border-b border-slate-50 py-3">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone className="h-4 w-4 text-slate-400" />
              Phone Number
            </div>

            {editing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-40 rounded-md border border-slate-300 px-2 py-1 text-right text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
              />
            ) : (
              <span className="text-sm font-medium text-slate-800">
                {phone}
              </span>
            )}

          </div>

          {/* Specialty */}
          <InfoRow
            icon={Wrench}
            label="Specialty"
            value={mockWorker.specialty}
          />

        </div>

        {/* =====================================================
            SECURITY
        ===================================================== */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="mb-3 text-sm font-semibold text-slate-800">
            Security
          </h2>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <KeyRound className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  Password
                </p>

                <p className="text-xs text-slate-400">
                  ••••••••••
                </p>
              </div>

            </div>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
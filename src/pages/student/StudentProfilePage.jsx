import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, ChevronRight, KeyRound } from "lucide-react";
import { mockStudent, mockComplaints, getComplaintCounts } from "../../mockStudentData";

/* ------------------------------------------------------------------
   HallMate — Student Profile (FRONTEND-ONLY)
   ------------------------------------------------------------------
   "Edit" links toggle a lightweight inline edit mode for the fields
   the spec allows students to change (phone, profile picture,
   password). Student ID / department / session / hall / room / seat
   stay permanently read-only since they come from verified records.
------------------------------------------------------------------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function StudentProfilePage() {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [phone, setPhone] = useState(mockStudent.phone);

  const counts = getComplaintCounts(mockComplaints);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500">View and manage your profile information</p>
      </div>

      {/* Top row: Avatar + Personal + Hall */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Avatar card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <div className="relative mx-auto mb-4 h-24 w-24">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-3xl font-semibold text-indigo-600">
              {mockStudent.profilePicture ? (
                <img src={mockStudent.profilePicture} alt="" className="h-full w-full object-cover" />
              ) : (
                mockStudent.fullName.charAt(0)
              )}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white hover:bg-indigo-700">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-base font-semibold text-slate-900">{mockStudent.fullName}</p>
          <p className="text-sm text-slate-500">Student</p>
          <p className="mt-1 text-xs text-slate-400">ID: {mockStudent.studentId}</p>
          <p className="text-xs text-slate-400">{mockStudent.department}</p>
          <button className="mt-4 w-full rounded-lg border border-slate-300 bg-white py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Edit Profile
          </button>
        </div>

        {/* Personal Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Personal Information</h2>
            <button
              onClick={() => setEditingPersonal((s) => !s)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              {editingPersonal ? "Done" : "Edit"}
            </button>
          </div>

          <InfoRow label="Full Name" value={mockStudent.fullName} />
          <InfoRow label="Student ID" value={mockStudent.studentId} />
          <InfoRow label="University Email" value={mockStudent.email} />

          <div className="flex items-center justify-between py-1.5 text-sm">
            <span className="text-slate-500">Phone Number</span>
            {editingPersonal ? (
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

        {/* Hall Information (fully read-only) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Hall Information</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Read-only
            </span>
          </div>
          <InfoRow label="Hall" value={mockStudent.hall} />
          <InfoRow label="Room Number" value={mockStudent.room} />
          <InfoRow label="Seat Number" value={mockStudent.seat} />
          <InfoRow label="Session" value={mockStudent.session} />
        </div>
      </div>

      {/* Complaint Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Complaint Summary</h2>
          <Link to="/student/complaints" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-indigo-50 p-4 text-center">
            <p className="text-xs font-medium text-indigo-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-indigo-700">{counts.total}</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-4 text-center">
            <p className="text-xs font-medium text-amber-500">Pending</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">{counts.pending}</p>
          </div>
          <div className="rounded-xl bg-sky-50 p-4 text-center">
            <p className="text-xs font-medium text-sky-500">In Progress</p>
            <p className="mt-1 text-2xl font-bold text-sky-700">{counts.inProgress}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-xs font-medium text-emerald-500">Resolved</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{counts.resolved}</p>
          </div>
        </div>
      </div>

      {/* Security */}
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
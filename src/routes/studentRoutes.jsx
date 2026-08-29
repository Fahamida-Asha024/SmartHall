import React from "react";
import { Route } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout";
import StudentDashboardPage from "../pages/student/StudentDashboardPage";

function MyComplaintsPage() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        My Complaints
      </h1>

      <p className="mt-2 text-slate-500">
        This is your complaints page.
      </p>
    </div>
  );
}

function SubmitComplaintPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Submit Complaint</h1>
    </div>
  );
}

function StudentProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Student Profile</h1>
    </div>
  );
}

function StudentNotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Notifications</h1>
    </div>
  );
}

export default function studentRoutes() {
  return (
    <Route path="/student" element={<StudentLayout />}>

      <Route
        path="dashboard"
        element={<StudentDashboardPage />}
      />

      <Route
        path="complaints"
        element={<MyComplaintsPage />}
      />

      <Route
        path="complaints/new"
        element={<SubmitComplaintPage />}
      />

      <Route
        path="profile"
        element={<StudentProfilePage />}
      />

      <Route
        path="notifications"
        element={<StudentNotificationsPage />}
      />

    </Route>
  );
}
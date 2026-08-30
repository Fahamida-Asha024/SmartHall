import React from "react";
import { Route } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout";

// Student pages
import StudentDashboardPage from "../pages/student/StudentDashboardPage";
import MyComplaintsPage from "../pages/student/MyComplaintsPage";
import SubmitComplaintPage from "../pages/student/SubmitComplaintPage";
import StudentProfilePage from "../pages/student/StudentProfilePage";
import StudentNotificationsPage from "../pages/student/StudentNotificationsPage";

export default function StudentRoutes() {
  return (
    <Route path="/student" element={<StudentLayout />}>

      {/* Student Dashboard */}
      <Route
        path="dashboard"
        element={<StudentDashboardPage />}
      />

      {/* My Complaints */}
      <Route
        path="complaints"
        element={<MyComplaintsPage />}
      />

      {/* Submit New Complaint */}
      <Route
        path="complaints/new"
        element={<SubmitComplaintPage />}
      />

      {/* Student Profile */}
      <Route
        path="profile"
        element={<StudentProfilePage />}
      />

      {/* Notifications */}
      <Route
        path="notifications"
        element={<StudentNotificationsPage />}
      />

    </Route>
  );
}
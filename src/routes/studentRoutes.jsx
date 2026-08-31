import React from "react";
import { Route } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout";

import StudentDashboardPage from "../pages/student/StudentDashboardPage";
import MyComplaintsPage from "../pages/student/MyComplaintsPage";
import SubmitComplaintPage from "../pages/student/SubmitComplaintPage";
import ComplaintDetailsPage from "../pages/student/ComplaintDetailsPage";
import StudentProfilePage from "../pages/student/StudentProfilePage";
import StudentNotificationsPage from "../pages/student/StudentNotificationsPage";

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

      {/* View complaint details */}
      <Route
        path="complaints/:id"
        element={<ComplaintDetailsPage />}
      />

      {/* Submit new complaint */}
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
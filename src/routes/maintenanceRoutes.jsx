import React from "react";
import { Route } from "react-router-dom";

import MaintenanceLayout from "../layouts/MaintenanceLayout";

import MaintenanceDashboardPage from "../pages/maintenance/MaintenanceDashboardPage";
import TaskDetailsPage from "../pages/maintenance/TaskDetailsPage";
import WorkHistoryPage from "../pages/maintenance/WorkHistoryPage";
import MaintenanceNotificationsPage from "../pages/maintenance/MaintenanceNotificationsPage";

export default function MaintenanceRoutes() {
  return (
    <Route path="/maintenance" element={<MaintenanceLayout />}>

      {/* Dashboard */}
      <Route
        path="dashboard"
        element={<MaintenanceDashboardPage />}
      />

      {/* Individual Task */}
      <Route
        path="tasks/:id"
        element={<TaskDetailsPage />}
      />

      {/* Work History */}
      <Route
        path="history"
        element={<WorkHistoryPage />}
      />

      {/* Notifications */}
      <Route
        path="notifications"
        element={<MaintenanceNotificationsPage />}
      />

    </Route>
  );
}
import React from "react";
import { Route } from "react-router-dom";

import MaintenanceLayout from "../layouts/MaintenanceLayout";
import MaintenanceDashboardPage from "../pages/maintenance/MaintenanceDashboardPage";
import TaskDetailsPage from "../pages/maintenance/TaskDetailsPage";
import WorkHistoryPage from "../pages/maintenance/WorkHistoryPage";
import MaintenanceNotificationsPage from "../pages/maintenance/MaintenanceNotificationsPage";
import MaintenanceProfilePage from "../pages/maintenance/MaintenanceProfilePage";

export default function MaintenanceRoutes() {
  return (
    <Route path="/maintenance" element={<MaintenanceLayout />}>

      <Route
        path="dashboard"
        element={<MaintenanceDashboardPage />}
      />

      <Route
        path="tasks/:id"
        element={<TaskDetailsPage />}
      />

      <Route
        path="history"
        element={<WorkHistoryPage />}
      />

      <Route
        path="notifications"
        element={<MaintenanceNotificationsPage />}
      />

      <Route
        path="profile"
        element={<MaintenanceProfilePage />}
      />

    </Route>
  );
}
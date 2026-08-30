import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UserManagementPage from "../pages/admin/users/UserManagementPage";
import RolesPermissionsPage from "../pages/admin/roles/RolesPermissionsPage";
import CategoriesPage from "../pages/admin/complaint-system/CategoriesPage";
import PrioritiesPage from "../pages/admin/complaint-system/PrioritiesPage";
import StatusesPage from "../pages/admin/complaint-system/StatusesPage";
import ReportsPage from "../pages/admin/monitoring/ReportsPage";
import ActivityLogPage from "../pages/admin/monitoring/ActivityLogPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import NotificationSettingsPage from "../pages/admin/system/NotificationSettingsPage";
import SystemSettingsPage from "../pages/admin/system/SystemSettingsPage";
import HallAuthorityManagementPage from "../pages/admin/hall-authority/HallAuthorityManagementPage";
import MaintenanceStaffManagementPage from "../pages/admin/maintenance-staff/MaintenanceStaffManagementPage";
import AdminNotificationsPage from "../pages/admin/AdminNotificationsPage";

export default function adminRoutes() {
  return (
    <Route path="/admin" element={<AdminLayout />}>
      <Route
        path="dashboard"
        element={<AdminDashboardPage />}
      />

      {/* more routes added as we build each page */}
      <Route path="users" element={<UserManagementPage />} />
      <Route path="roles-permissions" element={<RolesPermissionsPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="priorities" element={<PrioritiesPage />} />
      <Route path="statuses" element={<StatusesPage />} />
      <Route path="reports" element={<ReportsPage />} />
      <Route path="activity-log" element={<ActivityLogPage />} />
      <Route path="profile" element={<AdminProfilePage />} />
      <Route path="notification-settings" element={<NotificationSettingsPage />} />
      <Route path="system-settings" element={<SystemSettingsPage />} />
      <Route path="hall-authorities" element={<HallAuthorityManagementPage />} />
      <Route path="maintenance-staff" element={<MaintenanceStaffManagementPage />} />
      <Route path="notifications" element={<AdminNotificationsPage />} />


    </Route>
  );
}
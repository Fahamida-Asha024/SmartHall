import React from "react";
import { Route, Navigate } from "react-router-dom";

import HallAuthorityLayout from "../layouts/HallAuthorityLayout";
import HallAuthorityDashboardPage from "../pages/hall-authority/HallAuthorityDashboardPage";
import AllComplaintsPage from "../pages/hall-authority/AllComplaintsPage";
import PendingComplaintsPage from "../pages/hall-authority/PendingComplaintsPage";
import ComplaintDetailsPage from "../pages/hall-authority/ComplaintDetailsPage";
import WorkOrdersPage from "../pages/hall-authority/WorkOrdersPage";
import AssignWorkPage from "../pages/hall-authority/AssignWorkPage";
import WorkOrderDetailsPage from "../pages/hall-authority/WorkOrderDetailsPage";
import CompletedWorkPage from "../pages/hall-authority/CompletedWorkPage";
import ReportsPage from "../pages/hall-authority/ReportsPage";
import HallAuthorityNotificationsPage from "../pages/hall-authority/HallAuthorityNotificationsPage";
import HallAuthorityProfilePage from "../pages/hall-authority/HallAuthorityProfilePage";

export default function hallAuthorityRoutes() {
  return (
    <Route path="/hall-authority" element={<HallAuthorityLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<HallAuthorityDashboardPage />} />

      {/* Complaints */}
      <Route path="complaints" element={<AllComplaintsPage />} />
      <Route path="complaints/pending" element={<PendingComplaintsPage />} />
      <Route path="complaints/:id" element={<ComplaintDetailsPage />} />

      {/* Maintenance */}
      <Route path="work-orders" element={<WorkOrdersPage />} />
      <Route path="work-orders/:id" element={<WorkOrderDetailsPage />} />
      <Route path="assign-work" element={<AssignWorkPage />} />
      <Route path="completed-work" element={<CompletedWorkPage />} />

      {/* Monitoring */}
      <Route path="reports" element={<ReportsPage />} />

      {/* Account */}
      <Route path="notifications" element={<HallAuthorityNotificationsPage />} />
      <Route path="profile" element={<HallAuthorityProfilePage />} />
    </Route>
  );
}
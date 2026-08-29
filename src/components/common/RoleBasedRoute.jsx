import React from "react";
import { Navigate } from "react-router-dom";

// TODO (backend later): pull the real role from AuthContext/JWT payload.
export default function RoleBasedRoute({ allowedRoles, children }) {
  const role = localStorage.getItem("hallmate_role");

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
}
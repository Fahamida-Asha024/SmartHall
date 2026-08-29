import React from "react";
import { Navigate } from "react-router-dom";

// TODO (backend later): replace localStorage check with real token/session
// validation, e.g. via an AuthContext that verifies a JWT.
export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("hallmate_role"); // set by LoginPage

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
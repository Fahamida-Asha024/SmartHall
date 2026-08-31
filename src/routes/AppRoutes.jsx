import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";

import studentRoutes from "./studentRoutes";
import adminRoutes from "./adminRoutes";
import maintenanceRoutes from "./maintenanceRoutes";


export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* =====================================================
          STUDENT ROUTES
      ===================================================== */}

      {studentRoutes()}
      {adminRoutes()}
      {maintenanceRoutes()}


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}
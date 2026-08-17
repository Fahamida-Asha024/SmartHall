import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import MyComplaints from "./components/pages/student/MyComplaints";
import Profile from "./components/pages/student/Profile";

import SubmitComplaint from "./components/pages/student/complaint/SubmitComplaint";

import AdminDashboard from "./components/pages/admin/Dashboard";
import AllComplaints from "./components/pages/admin/AllComplaints";
import Reports from "./components/pages/admin/Reports";
import ManageStudents from "./components/pages/admin/ManageStudents";
import ManageProvosts from "./components/pages/admin/ManageProvosts";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== PUBLIC ROUTES ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== STUDENT ROUTES ==================== */}

        <Route
          path="/complaints"
          element={
            <ProtectedRoute role="student">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints/submit"
          element={
            <ProtectedRoute role="student">
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ==================== ADMIN / PROVOST ROUTES ==================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role={["admin", "provost"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute role={["admin", "provost"]}>
              <AllComplaints />
            </ProtectedRoute>
          }
        />


        {/* ==================== ADMIN ONLY ==================== */}

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/provosts"
          element={
            <ProtectedRoute role="admin">
              <ManageProvosts />
            </ProtectedRoute>
          }
        />


        {/* ==================== DEFAULT ==================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* ==================== UNKNOWN ROUTES ==================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
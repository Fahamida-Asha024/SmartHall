import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MyComplaints from "./components/pages/student/MyComplaints";
import SubmitComplaint from "./components/pages/student/SubmitComplaint";
import Profile from "./components/pages/student/Profile";
import Dashboard from "./components/pages/admin/Dashboard";
import AllComplaints from "./components/pages/admin/AllComplaints";
import Reports from "./components/pages/admin/Reports";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/complaints"
            element={
              <ProtectedRoute role="student">
                <MyComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints/new"
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

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/complaints"
            element={
              <ProtectedRoute role="admin">
                <AllComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute role="admin">
                <Reports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
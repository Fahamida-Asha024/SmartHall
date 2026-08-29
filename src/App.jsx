import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

//import StudentLayout from "./layouts/StudentLayout";
//import StudentDashboardPage from "./pages/student/StudentDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public Pages */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        
         

        {/* Temporary fallback */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
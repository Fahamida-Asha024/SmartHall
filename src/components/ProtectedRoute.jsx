import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useApp();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
}
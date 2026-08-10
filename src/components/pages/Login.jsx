import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function Login() {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !password) {
      setError(
        role === "student"
          ? "Invalid Student ID or Password."
          : "Invalid Username or Password."
      );
      return;
    }
    // TODO: replace with real API call (POST /api/students/login or /api/admin/login)
    login({ id, name: role === "student" ? "Rafi Sikder" : "Hall Authority", role });
    navigate(role === "student" ? "/complaints" : "/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] p-9">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-md flex items-center justify-center font-mono font-bold text-sm">
            HC
          </div>
          <div>
            <div className="text-sm font-semibold">Hall Complaint Management</div>
            <div className="text-xs text-gray-500">project 350</div>
          </div>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          {["student", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setError(""); }}
              className={`flex-1 text-sm font-semibold py-2 rounded-md capitalize ${
                role === r ? "bg-gray-900 text-white" : "text-gray-500"
              }`}
            >
              {r === "student" ? "Student" : "Hall administrator"}
            </button>
          ))}
        </div>

        <h1 className="text-xl font-bold mb-1">Log in</h1>
        <p className="text-sm text-gray-500 mb-5">
          {role === "student"
            ? "Use your university student ID to access complaints."
            : "Hall Authority access to manage complaints."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label={role === "student" ? "Student ID" : "Username"}
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={role === "student" ? "2021-CSE-041" : "hall.admin"}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit" className="w-full">Log in</Button>
        </form>

        {role === "student" && (
          <p className="text-center text-sm text-gray-500 mt-4">
            New here?{" "}
            <Link to="/register" className="font-semibold text-sky-700">
              Create a student account
            </Link>
          </p>
        )}
      </Card>
    </div>
  );
}
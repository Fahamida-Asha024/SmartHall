import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ROLES = [
  { key: "student", label: "Student" },
  { key: "provost", label: "Provost" },
  { key: "admin", label: "Admin" },
];

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

    // TODO: password এখনো backend-এ verify হচ্ছে না — শুধু demo purpose এ ফিল্ড রাখা আছে।
    // Real API যোগ করলে এখানে POST /api/auth/login কল করে token রাখবে।
    const res = login(id, role);

    if (!res.ok) {
      if (res.reason === "blocked") {
        setError("তোমার account admin block করে দিয়েছে। বিস্তারিত জানতে admin এর সাথে যোগাযোগ করো।");
      } else {
        setError(
          role === "student"
            ? "Invalid Student ID or Password."
            : "Invalid Username or Password."
        );
      }
      return;
    }

    navigate(role === "student" ? "/complaints" : "/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-16 w-[420px] h-[420px] bg-brand-300/50 rounded-full blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 bg-teal-300/40 rounded-full blur-2xl" />

      <Card className="w-[400px] p-9 relative z-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-teal-400 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white shadow-glow">
            HC
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Hall Complaint Management</div>
            <div className="text-xs text-gray-400">project 350</div>
          </div>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {ROLES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setRole(key); setError(""); }}
              className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                role === key
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Log in</h1>
        <p className="text-sm text-gray-400 mb-5">
          {role === "student" && "Use your university student ID to access complaints."}
          {role === "provost" && "Review and resolve student complaints for your hall."}
          {role === "admin" && "Manage provosts, students and system-wide oversight."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label={role === "student" ? "Student ID" : role === "provost" ? "Provost ID" : "Admin ID"}
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={role === "student" ? "222" : role === "provost" ? "PRV-1" : "ADM-1"}
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
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Create a student account
            </Link>
          </p>
        )}
      </Card>
    </div>
  );
}
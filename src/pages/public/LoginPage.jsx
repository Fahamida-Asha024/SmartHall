import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Building2,
  Mail,
  KeyRound,
  LogIn,
  GraduationCap,
  ShieldCheck,
  Wrench,
} from "lucide-react";

// Frontend-only demo roles
// No authentication or backend validation yet.
const ROLES = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    redirect: "/student/dashboard",
  },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    redirect: "/admin/dashboard",
  },
  {
    id: "maintenance",
    label: "Maintenance Staff",
    icon: Wrench,
    redirect: "/maintenance",
  },
];

function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
    >
      {children}
    </button>
  );
}

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Frontend-only login
  // No validation and no API call.
  const handleLogin = (e) => {
    e.preventDefault();

    const role = ROLES.find((item) => item.id === selectedRole);

    if (role) {
      navigate(role.redirect);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* ==================== BRAND HEADER ==================== */}

        <div className="mb-6 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              HallMate
            </p>

            <p className="text-xs text-slate-500">
              Hall Complaint Management System
            </p>
          </div>
        </div>

        {/* ==================== LOGIN CARD ==================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Heading */}

          <h1 className="mb-1 text-xl font-bold text-slate-900">
            Welcome back
          </h1>

          <p className="mb-6 text-sm text-slate-500">
            Log in to continue to your dashboard.
          </p>

          {/* ==================== ROLE SELECTOR ==================== */}

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Demo: log in as
            </p>

            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const active = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition ${
                      active
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    <span className="text-center">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== LOGIN FORM ==================== */}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email / ID */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {selectedRole === "student"
                  ? "Email or Student ID"
                  : selectedRole === "admin"
                  ? "Email or Admin ID"
                  : "Email or Staff ID"}
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder={
                    selectedRole === "student"
                      ? "Student ID or university email"
                      : selectedRole === "admin"
                      ? "Admin ID or email"
                      : "Staff ID or email"
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              Remember me on this device
            </label>

            {/* Login Button */}

            <PrimaryButton type="submit">
              <LogIn className="h-4 w-4" />
              Log In
            </PrimaryButton>
          </form>

          {/* ==================== REGISTRATION ==================== */}

          {selectedRole === "student" && (
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-700"
              >
                Register here
              </Link>
            </p>
          )}

          {/* ==================== MAINTENANCE NOTE ==================== */}

          {selectedRole === "maintenance" && (
            <p className="mt-6 text-center text-xs text-slate-400">
              Maintenance staff can view assigned work orders and update
              their status.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
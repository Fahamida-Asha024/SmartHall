import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useApp } from "../../context/AppContext";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";


const ROLES = [
  {
    key: "student",
    label: "Student",
  },
  {
    key: "provost",
    label: "Provost",
  },
  {
    key: "admin",
    label: "Admin",
  },
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

    setError("");


    // -----------------------------
    // BASIC VALIDATION
    // -----------------------------

    if (!id.trim() || !password.trim()) {

      setError(
        role === "student"
          ? "Please enter your Student ID and Password."
          : role === "provost"
          ? "Please enter your Provost ID and Password."
          : "Please enter your Admin ID and Password."
      );

      return;
    }


    // -----------------------------
    // LOGIN
    // -----------------------------

    const res = login(id, role);


    // -----------------------------
    // LOGIN FAILED
    // -----------------------------

    if (!res.ok) {

      if (res.reason === "blocked") {

        setError(
          "Your account has been blocked by the admin. Please contact the administrator."
        );

      } else {

        setError(
          role === "student"
            ? "Invalid Student ID or Password."
            : role === "provost"
            ? "Invalid Provost ID or Password."
            : "Invalid Admin ID or Password."
        );
      }

      return;
    }


    // -----------------------------
    // LOGIN SUCCESS
    // -----------------------------

    if (role === "student") {

      navigate("/complaints");

    } else {

      // IMPORTANT:
      // App.jsx uses /admin/dashboard,
      // NOT /admin

      navigate("/admin/dashboard");

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 relative overflow-hidden">

      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute
          -top-20
          -right-16
          w-[420px]
          h-[420px]
          bg-brand-300/50
          rounded-full
          blur-2xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          -left-24
          w-80
          h-80
          bg-teal-300/40
          rounded-full
          blur-2xl
        "
      />


      {/* Login Card */}

      <Card className="w-[400px] p-9 relative z-10">

        {/* Logo */}

        <div className="flex items-center gap-2.5 mb-6">

          <div
            className="
              w-9
              h-9
              bg-gradient-to-br
              from-brand-400
              to-teal-400
              rounded-xl
              flex
              items-center
              justify-center
              font-mono
              font-bold
              text-sm
              text-white
              shadow-glow
            "
          >
            HC
          </div>

          <div>

            <div className="text-sm font-semibold text-gray-900">
              Hall Complaint Management
            </div>

            <div className="text-xs text-gray-400">
              project 350
            </div>

          </div>

        </div>


        {/* Role Selector */}

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">

          {ROLES.map(({ key, label }) => (

            <button
              key={key}
              type="button"
              onClick={() => {
                setRole(key);
                setError("");
                setId("");
                setPassword("");
              }}
              className={`
                flex-1
                text-xs
                font-semibold
                py-2
                rounded-lg
                transition-all
                ${
                  role === key
                    ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {label}
            </button>

          ))}

        </div>


        {/* Heading */}

        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Log in
        </h1>


        {/* Description */}

        <p className="text-sm text-gray-400 mb-5">

          {role === "student" &&
            "Use your university student ID to access complaints."
          }

          {role === "provost" &&
            "Review and resolve student complaints for your hall."
          }

          {role === "admin" &&
            "Manage provosts, students and system-wide oversight."
          }

        </p>


        {/* Login Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-3.5"
        >

          {/* ID */}

          <Input
            label={
              role === "student"
                ? "Student ID"
                : role === "provost"
                ? "Provost ID"
                : "Admin ID"
            }
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={
              role === "student"
                ? "222"
                : role === "provost"
                ? "PRV-1"
                : "ADM-1"
            }
          />


          {/* Password */}

          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="••••••••"
          />


          {/* Error */}

          {error && (

            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">

              <p className="text-xs text-red-600">
                {error}
              </p>

            </div>

          )}


          {/* Login Button */}

          <Button
            type="submit"
            className="w-full"
          >
            Log in
          </Button>

        </form>


        {/* Student Registration */}

        {role === "student" && (

          <p className="text-center text-sm text-gray-500 mt-4">

            New here?{" "}

            <Link
              to="/register"
              className="
                font-semibold
                text-brand-600
                hover:text-brand-700
              "
            >
              Create a student account
            </Link>

          </p>

        )}

      </Card>

    </div>
  );
}
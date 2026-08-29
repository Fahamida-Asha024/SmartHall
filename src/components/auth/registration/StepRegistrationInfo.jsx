import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Phone,
  User,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function StepRegistrationInfo({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();

    // Frontend-only.
    // No validation or backend connection yet.
    onNext();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* ==================== HEADER ==================== */}

      <div className="mb-7">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
        </div>

        <h1 className="mb-1 text-xl font-bold text-slate-900">
          Complete your registration
        </h1>

        <p className="text-sm leading-6 text-slate-500">
          Add your personal details, academic information, hall information,
          and create a password.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-7">

        {/* =========================================================
            PERSONAL INFORMATION
        ========================================================= */}

        <section>
          <div className="mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-sm font-semibold text-slate-800">
              Personal Information
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Tell us a little about yourself.
            </p>
          </div>

          {/* Full Name + Phone Number */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Full Name */}

            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    updateFormData("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Phone Number */}

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    updateFormData("phone", e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            ACADEMIC INFORMATION
        ========================================================= */}

        <section>
          <div className="mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-sm font-semibold text-slate-800">
              Academic Information
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Select your academic information.
            </p>
          </div>

          {/* Session + Department */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Session */}

            <SelectField
              label="Session"
              value={formData.session}
              onChange={(e) =>
                updateFormData("session", e.target.value)
              }
              options={[
                "2021-2022",
                "2022-2023",
                "2023-2024",
                "2024-2025",
                "2025-2026",
                "2026-2027",
              ]}
              placeholder="Select session"
            />

            {/* Department */}

            <SelectField
              label="Department"
              value={formData.department}
              onChange={(e) =>
                updateFormData("department", e.target.value)
              }
              options={[
                "Computer Science & Engineering",
                "Software Engineering",
                "Electrical & Electronic Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
                "Industrial & Production Engineering",
                "Architecture",
              ]}
              placeholder="Select department"
            />

          </div>
        </section>

        {/* =========================================================
            HALL INFORMATION
        ========================================================= */}

        <section>
          <div className="mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-sm font-semibold text-slate-800">
              Hall Information
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Select your current hall and room details.
            </p>
          </div>

          {/* Hall Name + Block */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Hall Name */}

            <SelectField
              label="Hall Name"
              value={formData.hallName}
              onChange={(e) =>
                updateFormData("hallName", e.target.value)
              }
              options={[
                "Hall A",
                "Hall B",
                "Hall C",
                "Hall D",
                "Hall E",
              ]}
              placeholder="Select hall"
            />

            {/* Block */}

            <SelectField
              label="Block"
              value={formData.block}
              onChange={(e) =>
                updateFormData("block", e.target.value)
              }
              options={[
                "Block A",
                "Block B",
                "Block C",
                "Block D",
              ]}
              placeholder="Select block"
            />

          </div>

          {/* Room Number — HALF WIDTH */}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <SelectField
              label="Room Number"
              value={formData.roomNumber}
              onChange={(e) =>
                updateFormData("roomNumber", e.target.value)
              }
              options={[
                "101",
                "102",
                "103",
                "104",
                "201",
                "202",
                "203",
                "204",
                "301",
                "302",
                "303",
                "304",
              ]}
              placeholder="Select room"
            />

          </div>
        </section>

        {/* =========================================================
            PASSWORD
        ========================================================= */}

        <section>
          <div className="mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-sm font-semibold text-slate-800">
              Create Password
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Choose a password for your HallMate account.
            </p>
          </div>

          <div className="space-y-4">

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    updateFormData("password", e.target.value)
                  }
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            BUTTONS
        ========================================================= */}

        <div className="flex gap-3 pt-2">

          <button
            type="button"
            onClick={onBack}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="submit"
            className="inline-flex flex-[2] items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

      </form>
    </div>
  );
}


/* ================================================================
   REUSABLE SELECT FIELD
================================================================ */

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
            value
              ? "text-slate-900"
              : "text-slate-400"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      </div>
    </div>
  );
}
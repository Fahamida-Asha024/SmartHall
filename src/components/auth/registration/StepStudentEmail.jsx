import { ArrowRight, GraduationCap, Mail, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function StepStudentEmail({
  formData,
  updateFormData,
  onNext,
}) {
  const handleNext = (e) => {
    e.preventDefault();

    // Frontend-only:
    // No validation for now.
    onNext();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div className="mb-7">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
        </div>

        <h1 className="mb-1 text-xl font-bold text-slate-900">
          Create your student account
        </h1>

        <p className="text-sm leading-6 text-slate-500">
          Start by providing your student ID and university email address.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-5">

        {/* Student ID */}

        <div>
          <label
            htmlFor="studentId"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Student ID
          </label>

          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              id="studentId"
              type="text"
              value={formData.studentId}
              onChange={(e) =>
                updateFormData("studentId", e.target.value)
              }
              placeholder="Enter your student ID"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* University Email */}

        <div>
          <label
            htmlFor="universityEmail"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            University Email
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              id="universityEmail"
              type="email"
              value={formData.universityEmail}
              onChange={(e) =>
                updateFormData("universityEmail", e.target.value)
              }
              placeholder="yourname@university.edu"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <p className="mt-1.5 text-xs text-slate-400">
            Use your official university email address.
          </p>
        </div>

        {/* Next */}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Login */}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}

        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Log in
        </Link>
      </p>

    </div>
  );
}
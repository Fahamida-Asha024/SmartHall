import {
  ArrowLeft,
  ArrowRight,
  MailCheck,
  RefreshCw,
} from "lucide-react";

export default function StepEmailVerification({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const handleVerify = (e) => {
    e.preventDefault();

    // Frontend-only:
    // No real email verification yet.
    onNext();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
          <MailCheck className="h-6 w-6 text-indigo-600" />
        </div>

        <h1 className="mb-1 text-xl font-bold text-slate-900">
          Verify your email
        </h1>

        <p className="mx-auto max-w-md text-sm leading-6 text-slate-500">
          We've sent a verification code to
          <span className="font-medium text-slate-700">
            {" "}{formData.universityEmail || "your university email"}
          </span>
          .
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-5">

        {/* Verification Code */}

        <div>
          <label
            htmlFor="verificationCode"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Verification Code
          </label>

          <input
            id="verificationCode"
            type="text"
            value={formData.verificationCode}
            onChange={(e) =>
              updateFormData("verificationCode", e.target.value)
            }
            placeholder="Enter verification code"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-center text-lg tracking-[0.35em] text-slate-900 outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Resend */}

        <button
          type="button"
          className="mx-auto flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          <RefreshCw className="h-4 w-4" />
          Resend verification code
        </button>

        {/* Buttons */}

        <div className="flex gap-3">

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
            Verify Email
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

      </form>

    </div>
  );
}
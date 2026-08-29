import { Check, FileText, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StepTerms({
  formData,
  updateFormData,
  onBack,
}) {
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Frontend-only.
    // No API call or actual account creation yet.
    navigate("/login");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div className="mb-7">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>

        <h1 className="mb-1 text-xl font-bold text-slate-900">
          Terms & Policies
        </h1>

        <p className="text-sm leading-6 text-slate-500">
          Please review and accept the following policies to complete your
          HallMate registration.
        </p>
      </div>

      <form onSubmit={handleCreateAccount} className="space-y-5">

        {/* Terms */}

        <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) =>
              updateFormData("termsAccepted", e.target.checked)
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Terms of Service
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              I agree to follow the rules and regulations of the HallMate
              system and my residential hall.
            </p>
          </div>
        </label>

        {/* Privacy */}

        <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              updateFormData("privacyAccepted", e.target.checked)
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Privacy Policy
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              I understand that my registration and hall-related information
              may be stored and used for managing hall services.
            </p>
          </div>
        </label>

        {/* Information confirmation */}

        <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
          <input
            type="checkbox"
            checked={formData.informationConfirmed}
            onChange={(e) =>
              updateFormData(
                "informationConfirmed",
                e.target.checked
              )
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Information Confirmation
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              I confirm that the information I provided during registration
              is accurate.
            </p>
          </div>
        </label>

        {/* Security Notice */}

        <div className="flex gap-3 rounded-xl bg-indigo-50 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Your information is protected
            </p>

            <p className="mt-1 text-xs leading-5 text-indigo-700">
              HallMate uses your information only for account and hall
              management purposes.
            </p>
          </div>
        </div>

        {/* Buttons */}

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
            <Check className="h-4 w-4" />
            Accept & Create Account
          </button>

        </div>

      </form>

    </div>
  );
}

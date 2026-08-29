import { useState } from "react";
import { Building2 } from "lucide-react";

import StepStudentEmail from "./StepStudentEmail";
import StepEmailVerification from "./StepEmailVerification";
import StepRegistrationInfo from "./StepRegistrationInfo";
import StepTerms from "./StepTerms";

export default function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    studentId: "",
    universityEmail: "",
    verificationCode: "",
    fullName: "",
    phone: "",
    session: "",
    department: "",
    hallName: "",
    block: "",
    roomNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyAccepted: false,
    informationConfirmed: false,
  });

  const updateFormData = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep((previous) => previous + 1);
  };

  const previousStep = () => {
    setCurrentStep((previous) => previous - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">

      <div className="mx-auto w-full max-w-2xl">

        {/* ==================== BRAND ==================== */}

        <div className="mb-8 flex items-center justify-center gap-2.5">
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

        {/* ==================== PROGRESS ==================== */}

        {currentStep <= 4 && (
          <div className="mb-6">

            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Student Registration
              </p>

              <p className="text-xs font-medium text-slate-500">
                Step {currentStep} of 4
              </p>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    step <= currentStep
                      ? "bg-indigo-600"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

          </div>
        )}

        {/* ==================== STEP CONTENT ==================== */}

        {currentStep === 1 && (
          <StepStudentEmail
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <StepEmailVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {currentStep === 3 && (
          <StepRegistrationInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {currentStep === 4 && (
          <StepTerms
            formData={formData}
            updateFormData={updateFormData}
            onBack={previousStep}
          />
        )}

      </div>
    </div>
  );
}
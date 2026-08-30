import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { complaintCategories, complaintPriorities } from "../../mockStudentData";
import ImageUploader from "../../components/common/ImageUploader";

function generateComplaintId() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CMP-${year}-${random}`;
}

const PRIORITY_DOT = {
  Low: "bg-slate-400",
  Medium: "bg-amber-500",
  High: "bg-orange-500",
  Emergency: "bg-rose-600",
};

export default function SubmitComplaintPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: complaintCategories[0],
    description: "",
    location: "",
    priority: "Medium",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    else if (form.description.trim().length < 10) newErrors.description = "Please add a bit more detail (at least 10 characters).";
    if (!form.location.trim()) newErrors.location = "Location/Room is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const complaintId = generateComplaintId();
    setSubmittedComplaint({ ...form, id: complaintId, status: "Submitted" });
  };

  const handleCancel = () => navigate("/student/dashboard");

  if (submittedComplaint) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-7 w-7 text-emerald-600" />
        </div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">Complaint Submitted</h1>
        <p className="mb-6 text-sm text-slate-500">
          Your complaint has been received and will be reviewed by the hall administration shortly.
        </p>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 text-left text-sm">
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Complaint ID</span>
            <span className="font-semibold text-slate-900">{submittedComplaint.id}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Title</span>
            <span className="font-medium text-slate-900">{submittedComplaint.title}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Category</span>
            <span className="font-medium text-slate-900">{submittedComplaint.category}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Status</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {submittedComplaint.status}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/student/complaints")}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View My Complaints
          </button>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Submit Complaint</h1>
        <p className="text-sm text-slate-500">Fill in the details to submit a new complaint</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {complaintCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Ceiling fan not working"
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition
                  ${errors.title ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
              />
              {errors.title && <p className="mt-1.5 text-sm text-rose-600">{errors.title}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Room 304"
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition
                  ${errors.location ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
              />
              {errors.location && <p className="mt-1.5 text-sm text-rose-600">{errors.location}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Priority <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className={`pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${PRIORITY_DOT[form.priority]}`} />
                <select
                  value={form.priority}
                  onChange={(e) => update("priority", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-8 pr-3 text-sm text-slate-900 outline-none
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {complaintPriorities.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                You can set an initial priority — the admin may adjust it after review.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={5}
                placeholder="Describe the issue in detail — what's wrong, when it started, anything relevant."
                className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition
                  ${errors.description ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
              />
              {errors.description && <p className="mt-1.5 text-sm text-rose-600">{errors.description}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Upload Images</label>
              <ImageUploader files={images} onChange={setImages} maxFiles={5} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
}
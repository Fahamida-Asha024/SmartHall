import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../../../context/AppContext";

import Layout from "../../../Layout";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";

import ComplaintForm from "./ComplaintForm";

import { complaintCategories } from "../../../../data/complaintCategories";

import {
  Bed,
  Building2,
  Users,
  ClipboardList,
  Wrench,
  Zap,
  Droplets,
  Sparkles,
  Armchair,
  Refrigerator,
  Wifi,
  Brush,
  ShieldCheck,
  Utensils,
  Leaf,
  MoreHorizontal,
} from "lucide-react";


// ======================================================
// STEP 1 — COMPLAINT SCOPES
// ======================================================

const SCOPES = [
  {
    id: "personal",
    title: "Personal / Room",
    description:
      "Problems inside your room or attached bathroom.",
    icon: Bed,
  },

  {
    id: "common",
    title: "Common Area",
    description:
      "Bathroom, corridor, stairs, common room, etc.",
    icon: Building2,
  },

  {
    id: "student",
    title: "Student Issue",
    description:
      "Conflicts, noise, or issues involving residents.",
    icon: Users,
  },

  {
    id: "admin",
    title: "Administration",
    description:
      "Hall office, seat allocation, or service requests.",
    icon: ClipboardList,
  },
];


// ======================================================
// CATEGORY ICONS
// ======================================================

const CATEGORY_ICONS = {
  electrical: Zap,
  plumbing: Droplets,
  sanitation: Sparkles,
  furniture: Armchair,
  appliance: Refrigerator,
  internet: Wifi,
  cleaning: Brush,
  maintenance: Wrench,
  security: ShieldCheck,
  dining: Utensils,
  student_issue: Users,
  environment: Leaf,
  other: MoreHorizontal,
};


// ======================================================
// COMPONENT
// ======================================================

export default function SubmitComplaint() {
  const navigate = useNavigate();

  const { user, addComplaint } = useApp();


  // ====================================================
  // STEP STATE
  // ====================================================

  const [scope, setScope] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");


  // ====================================================
  // FORM STATE
  // ====================================================

  const [form, setForm] = useState({
    title: "",

    category: "",
    subCategory: "",

    priority: "Medium",

    locationType: "Personal",

    hall: user?.hall || "",
    block: user?.block || "",
    room: user?.room || "",

    commonLocation: "",

    description: "",

    attachment: null,
  });


  // ====================================================
  // UPDATE FORM
  // ====================================================

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  // ====================================================
  // STEP 1 — CHANGE SCOPE
  // ====================================================

  const handleScopeChange = (scopeId) => {
    setScope(scopeId);

    // Reset category
    setCategory("");

    // Clear previous error
    setError("");

    // Reset category information inside form
    setForm((prev) => ({
      ...prev,
      category: "",
      subCategory: "",
    }));
  };


  // ====================================================
  // STEP 2 — CHANGE CATEGORY
  // ====================================================

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);

    setError("");

    setForm((prev) => ({
      ...prev,
      category: categoryId,
      subCategory: "",
    }));
  };


  // ====================================================
  // SUBMIT COMPLAINT
  // ====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");


    // -----------------------------------------------
    // Validate scope
    // -----------------------------------------------

    if (!scope) {
      setError(
        "Please select where the issue is located."
      );

      return;
    }


    // -----------------------------------------------
    // Validate category
    // -----------------------------------------------

    if (!category) {
      setError(
        "Please select a complaint category."
      );

      return;
    }


    // -----------------------------------------------
    // Validate title
    // -----------------------------------------------

    if (!form.title.trim()) {
      setError(
        "Please enter a complaint title."
      );

      return;
    }


    // -----------------------------------------------
    // Validate description
    // -----------------------------------------------

    if (!form.description.trim()) {
      setError(
        "Please describe the problem."
      );

      return;
    }


    // -----------------------------------------------
    // Validate hall
    // -----------------------------------------------

    if (!form.hall.trim()) {
      setError(
        "Please provide your hall name."
      );

      return;
    }


    // -----------------------------------------------
    // Validate block
    // -----------------------------------------------

    if (!form.block.trim()) {
      setError(
        "Please provide your block."
      );

      return;
    }


    // -----------------------------------------------
    // Validate room
    // -----------------------------------------------

    if (!form.room.trim()) {
      setError(
        "Please provide your room number."
      );

      return;
    }


    // -----------------------------------------------
    // Validate common location
    // -----------------------------------------------

    if (
      form.locationType === "Common" &&
      !form.commonLocation
    ) {
      setError(
        "Please select the common area."
      );

      return;
    }


    // -----------------------------------------------
    // Create complaint data
    // -----------------------------------------------

    const complaintData = {
      ...form,

      scope: scope,

      category: category,

      commonLocation:
        form.locationType === "Common"
          ? form.commonLocation
          : "",

      submittedAt: new Date()
        .toISOString()
        .slice(0, 10),
    };


    // -----------------------------------------------
    // Add complaint
    // -----------------------------------------------

    addComplaint(complaintData);


    // -----------------------------------------------
    // Go to My Complaints
    // -----------------------------------------------

    navigate("/complaints");
  };


  // ====================================================
  // FILTER CATEGORIES BY SELECTED SCOPE
  // ====================================================

  const filteredCategories =
    complaintCategories.filter(
      (item) =>
        item.scopes &&
        item.scopes.includes(scope)
    );


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Layout
      title="Submit a Complaint"
      subtitle="Choose the type of issue you want to report"
    >

      <div className="max-w-4xl space-y-6">


        {/* ==================================================
            STEP 1 — SELECT SCOPE
        ================================================== */}

        <Card className="p-6">

          <h2 className="text-lg font-semibold mb-1">
            Step 1: Where is the issue?
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Select the scope that best matches your complaint.
          </p>


          <div className="grid md:grid-cols-2 gap-4">

            {SCOPES.map((item) => {

              const Icon = item.icon;

              const selected =
                scope === item.id;


              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleScopeChange(item.id)
                  }
                  className={`
                    text-left
                    border
                    rounded-xl
                    p-4
                    transition
                    hover:shadow-md
                    ${
                      selected
                        ? "border-purple-600 bg-purple-50 ring-1 ring-purple-500"
                        : "border-gray-200 bg-white hover:border-purple-300"
                    }
                  `}
                >

                  <Icon
                    className="w-8 h-8 text-purple-600 mb-3"
                  />


                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>


                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                </button>
              );
            })}

          </div>

        </Card>



        {/* ==================================================
            STEP 2 — SELECT CATEGORY
        ================================================== */}

        {scope && (

          <Card className="p-6">

            <h2 className="text-lg font-semibold mb-1">
              Step 2: Select a category
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Choose the category that best describes your problem.
            </p>


            {filteredCategories.length === 0 ? (

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">

                <p className="text-sm text-yellow-700">
                  No categories are available for this issue type.
                </p>

              </div>

            ) : (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {filteredCategories.map((item) => {

                  const Icon =
                    CATEGORY_ICONS[item.id] ||
                    MoreHorizontal;

                  const selected =
                    category === item.id;


                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          item.id
                        )
                      }
                      className={`
                        text-left
                        border
                        rounded-xl
                        p-4
                        transition
                        hover:shadow-md
                        ${
                          selected
                            ? "border-purple-600 bg-purple-50 ring-1 ring-purple-500"
                            : "border-gray-200 bg-white hover:border-purple-300"
                        }
                      `}
                    >

                      <Icon
                        className="w-7 h-7 text-purple-600 mb-3"
                      />


                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>


                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>

                    </button>
                  );

                })}

              </div>

            )}

          </Card>

        )}



        {/* ==================================================
            STEP 3 — COMPLAINT DETAILS
        ================================================== */}

        {scope && category && (

          <Card className="p-6">

            <h2 className="text-lg font-semibold mb-1">
              Step 3: Complaint details
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Provide the details of the problem.
            </p>


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <ComplaintForm
                form={form}
                updateForm={updateForm}
              />


              {/* =========================================
                  ERROR MESSAGE
              ========================================= */}

              {error && (

                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">

                  <p className="text-sm text-red-600">
                    {error}
                  </p>

                </div>

              )}



              {/* =========================================
                  BUTTONS
              ========================================= */}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    navigate("/complaints")
                  }
                >
                  Cancel
                </Button>


                <Button type="submit">
                  Submit Complaint
                </Button>

              </div>

            </form>

          </Card>

        )}



        {/* ==================================================
            START OVER
        ================================================== */}

        {(scope || category) && (

          <div className="flex justify-start">

            <Button
              type="button"
              variant="ghost"
              onClick={() => {

                setScope("");
                setCategory("");
                setError("");

                setForm((prev) => ({
                  ...prev,

                  category: "",
                  subCategory: "",

                  title: "",
                  priority: "Medium",

                  locationType: "Personal",

                  commonLocation: "",

                  description: "",

                  attachment: null,
                }));

              }}
            >
              Start Over
            </Button>

          </div>

        )}

      </div>

    </Layout>
  );
}
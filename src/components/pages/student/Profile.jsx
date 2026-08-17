import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import {
  Pencil,
  Camera,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Building2,
  DoorOpen,
} from "lucide-react";

const HALLS = [
  "Shah Paran Hall",
  "Ayesha Siddiqa Hall",
  "Bijoy 24 Hall",
  "Begum Sirajunnesa Chouwdhury Hall",
  "Syed Mujtaba Ali Hall",
  "Fatima Tuz Zahra Hall"
];

const BLOCKS = ["A", "B", "C", "D"];

const SESSIONS = [
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
  "2025-26",
  "2026-27",
];

export default function Profile() {
  const { user, updateProfile } = useApp();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    session: user?.session || SESSIONS[0],

    hall: user?.hall || HALLS[0],
    block: user?.block || BLOCKS[0],
    room: user?.room || "",

    profilePicture: user?.profilePicture || "",
  });

  // Start editing
  const startEdit = () => {
    setForm({
      email: user?.email || "",
      phone: user?.phone || "",
      dob: user?.dob || "",
      session: user?.session || SESSIONS[0],

      hall: user?.hall || HALLS[0],
      block: user?.block || BLOCKS[0],
      room: user?.room || "",

      profilePicture: user?.profilePicture || "",
    });

    setSaved(false);
    setEditing(true);
  };

  // Update one field in the form
  const handleChange = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  // Handle profile picture
  const handleProfilePicture = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      handleChange("profilePicture", reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = () => {
    updateProfile(user.id, form);

    setEditing(false);
    setSaved(true);
  };

  return (
    <Layout
      title="My profile"
      subtitle="View and update your personal and hall details"
    >
      <div className="max-w-3xl space-y-5">

        {/* ================= PROFILE HEADER ================= */}
        <Card className="p-6">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              {/* Profile picture */}
              <div className="relative">

                {form.profilePicture ? (
                  <img
                    src={form.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center border-2 border-gray-100">
                    <span className="text-2xl font-semibold text-teal-600">
                      {user?.name?.charAt(0)?.toUpperCase() || "S"}
                    </span>
                  </div>
                )}

                {/* Camera button */}
                {editing && (
                  <label className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center cursor-pointer hover:bg-teal-700">
                    <Camera className="w-4 h-4" />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePicture}
                    />
                  </label>
                )}

              </div>

              {/* Student basic information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.name || "Student"}
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                  Student ID: {user?.id || "—"}
                </p>

                <p className="text-sm text-gray-500">
                  {user?.department || "Software Engineering"}
                </p>
              </div>

            </div>

            {/* Edit button */}
            {!editing && (
              <Button variant="ghost" onClick={startEdit}>
                <Pencil className="w-3.5 h-3.5 mr-1.5" />
                Edit profile
              </Button>
            )}

          </div>
        </Card>


        {/* ================= PERSONAL INFORMATION ================= */}
        <Card className="p-6">

          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-teal-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Personal Information
              </h3>

              <p className="text-xs text-gray-500">
                Your basic personal details
              </p>
            </div>
          </div>


          <div className="space-y-4">

            {/* Full name and Student ID */}
            <div className="grid grid-cols-2 gap-4">

              <Input
                label="Full name"
                value={user?.name || ""}
                disabled
              />

              <Input
                label="Student ID"
                value={user?.id || ""}
                disabled
              />

            </div>


            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">

              <div className="relative">
                <Input
                  label="Email"
                  type="email"
                  value={editing ? form.email : user?.email || "—"}
                  disabled={!editing}
                  placeholder="student@example.com"
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />

                <Mail className="absolute right-3 top-8 w-4 h-4 text-gray-400" />
              </div>


              <div className="relative">
                <Input
                  label="Phone number"
                  type="tel"
                  value={editing ? form.phone : user?.phone || "—"}
                  disabled={!editing}
                  placeholder="01XXXXXXXXX"
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                />

                <Phone className="absolute right-3 top-8 w-4 h-4 text-gray-400" />
              </div>

            </div>


            {/* Date of Birth and Session */}
            <div className="grid grid-cols-2 gap-4">

              <div className="relative">
                <Input
                  label="Date of birth"
                  type="date"
                  value={editing ? form.dob : user?.dob || ""}
                  disabled={!editing}
                  onChange={(e) =>
                    handleChange("dob", e.target.value)
                  }
                />

                <Calendar className="absolute right-3 top-8 w-4 h-4 text-gray-400" />
              </div>


              {editing ? (
                <Select
                  label="Session"
                  value={form.session}
                  onChange={(e) =>
                    handleChange("session", e.target.value)
                  }
                >
                  {SESSIONS.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  label="Session"
                  value={user?.session || "—"}
                  disabled
                />
              )}

            </div>

          </div>

        </Card>


        {/* ================= HALL INFORMATION ================= */}
        <Card className="p-6">

          <div className="flex items-center gap-2 mb-5">

            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-teal-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Hall Information
              </h3>

              <p className="text-xs text-gray-500">
                Your current residential details
              </p>
            </div>

          </div>


          <div className="space-y-4">

            {/* Hall and Block */}
            <div className="grid grid-cols-2 gap-4">

              {editing ? (
                <Select
                  label="Hall"
                  value={form.hall}
                  onChange={(e) =>
                    handleChange("hall", e.target.value)
                  }
                >
                  {HALLS.map((hall) => (
                    <option key={hall} value={hall}>
                      {hall}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  label="Hall"
                  value={user?.hall || "—"}
                  disabled
                />
              )}


              {editing ? (
                <Select
                  label="Block"
                  value={form.block}
                  onChange={(e) =>
                    handleChange("block", e.target.value)
                  }
                >
                  {BLOCKS.map((block) => (
                    <option key={block} value={block}>
                      {block}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  label="Block"
                  value={user?.block || "—"}
                  disabled
                />
              )}

            </div>


            {/* Room */}
            <div className="relative">

              {editing ? (
                <Input
                  label="Room number"
                  value={form.room}
                  placeholder="214"
                  onChange={(e) =>
                    handleChange("room", e.target.value)
                  }
                />
              ) : (
                <Input
                  label="Room number"
                  value={user?.room || "—"}
                  disabled
                />
              )}

              <DoorOpen className="absolute right-3 top-8 w-4 h-4 text-gray-400" />

            </div>

          </div>

        </Card>


        {/* ================= SAVE / CANCEL ================= */}
        {editing && (
          <div className="flex justify-end gap-2.5">

            <Button
              variant="ghost"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>
              Save changes
            </Button>

          </div>
        )}


        {/* ================= SUCCESS MESSAGE ================= */}
        {saved && (
          <div className="text-center">
            <p className="text-xs text-teal-600">
              Profile updated successfully ✓
            </p>
          </div>
        )}

      </div>
    </Layout>
  );
}
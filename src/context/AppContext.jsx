import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "hcms_data_v1";
const seedUsers = [
  { id: "222", name: "Rafi Sikder", role: "student", blocked: false, hall: "Sadhinota Hall", block: "A", room: "214" },
  { id: "223", name: "Nusrat Jahan", role: "student", blocked: false, hall: "Bijoy Hall", block: "B", room: "105" },
  { id: "PRV-1", name: "Dr. Kamal Hossain", role: "provost", blocked: false },
  { id: "ADM-1", name: "System Admin", role: "admin", blocked: false },
];

const seedComplaints = [
  {
    id: "TCK-1001", studentId: "222", studentName: "Rafi Sikder",
    title: "Leaking faucet in room 214", category: "Plumbing", priority: "Medium",
    hall: "Sadhinota Hall", block: "A", room: "214", description: "Water leaking since morning",
    status: "Submitted", submittedAt: "2026-08-05", remarks: "",
    resolvedBy: null, resolvedAt: null, seen: false,
  },
];

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { users: seedUsers, complaints: seedComplaints };
}

export function AppProvider({ children }) {
  const [{ users, complaints }, setData] = useState(loadInitial);
  const [user, setUser] = useState(null); // currently logged-in user

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ users, complaints }));
  }, [users, complaints]);

  // ---- AUTH ----
  const login = (idOrName, role) => {
  const query = idOrName.trim().toLowerCase();
  const found = users.find(
    (u) =>
      u.role === role &&
      (u.id.toLowerCase() === query || u.name.toLowerCase().includes(query))
  );
  if (!found) return { ok: false, reason: "not_found" };
  if (found.blocked) return { ok: false, reason: "blocked" };
  setUser(found);
  return { ok: true };
};

  const registerStudent = ({ id, name }) => {
    if (users.some((u) => u.id === id)) return { ok: false, reason: "exists" };
    const newUser = { id, name, role: "student", blocked: false, hall: "", block: "", room: "" };
    setData((d) => ({ ...d, users: [...d.users, newUser] }));
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => setUser(null);

  // ---- COMPLAINTS ----
  const addComplaint = (form) => {
    const id = "TCK-" + (1000 + complaints.length + 1);
    const newComplaint = {
      id,
      studentId: user.id,
      studentName: user.name,
      title: form.title,
      category: form.category,
      priority: form.priority,
      hall: form.hall,
      block: form.block,
      room: form.room,
      description: form.description,
      status: "Submitted",
      submittedAt: new Date().toISOString().slice(0, 10),
      remarks: "",
      resolvedBy: null,
      resolvedAt: null,
      seen: false,
    };
    setData((d) => ({ ...d, complaints: [newComplaint, ...d.complaints] }));
  };

  const updateComplaintStatus = (id, status, remarks) => {
    setData((d) => ({
      ...d,
      complaints: d.complaints.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              remarks,
              seen: true,
              resolvedBy: status === "Resolved" ? user.name : c.resolvedBy,
              resolvedAt: status === "Resolved" ? new Date().toISOString().slice(0, 10) : c.resolvedAt,
            }
          : c
      ),
    }));
  };

  const markComplaintSeen = (id) => {
    setData((d) => ({
      ...d,
      complaints: d.complaints.map((c) => (c.id === id ? { ...c, seen: true } : c)),
    }));
  };

  // ---- PROFILE ----
  const updateProfile = (id, updates) => {
    setData((d) => ({
      ...d,
      users: d.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    }));
    // logged-in user object টাও sync রাখতে হবে যাতে UI সাথে সাথে বদলায়
    setUser((u) => (u && u.id === id ? { ...u, ...updates } : u));
  };

  // ---- ADMIN: USER MANAGEMENT ----
  const toggleBlockUser = (id) => {
    setData((d) => ({
      ...d,
      users: d.users.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)),
    }));
  };

  const addProvost = ({ id, name }) => {
    if (users.some((u) => u.id === id)) return { ok: false, reason: "exists" };
    setData((d) => ({ ...d, users: [...d.users, { id, name, role: "provost", blocked: false }] }));
    return { ok: true };
  };

  const removeProvost = (id) => {
    setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id) }));
  };

  // ---- DERIVED ----
  const students = users.filter((u) => u.role === "student");
  const provosts = users.filter((u) => u.role === "provost");
  const newComplaintsCount = complaints.filter((c) => !c.seen).length;

  const value = {
    user, login, logout, registerStudent, updateProfile,
    complaints, addComplaint, updateComplaintStatus, markComplaintSeen,
    users, students, provosts, toggleBlockUser, addProvost, removeProvost,
    newComplaintsCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
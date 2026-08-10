import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const initialComplaints = [
  {
    id: "HC-1042",
    title: "Leaking faucet in room 214",
    category: "Plumbing",
    priority: "High",
    status: "In Progress",
    block: "A",
    room: "214",
    description: "The bathroom faucet has been leaking since Sunday night.",
    remarks: "Plumber assigned, visit scheduled for Aug 8.",
    studentId: "2021-CSE-041",
    studentName: "Rafi Sikder",
    submittedAt: "2026-08-02",
  },
  {
    id: "HC-1038",
    title: "Broken window latch",
    category: "Furniture",
    priority: "Medium",
    status: "Under Review",
    block: "B",
    room: "108",
    description: "Window latch is broken, window doesn't close properly.",
    remarks: "",
    studentId: "2021-CSE-041",
    studentName: "Rafi Sikder",
    submittedAt: "2026-07-29",
  },
  {
    id: "HC-1025",
    title: "Mold on bathroom ceiling",
    category: "Sanitation",
    priority: "Emergency",
    status: "Submitted",
    block: "A",
    room: "214",
    description: "Mold growing on the bathroom ceiling, needs urgent attention.",
    remarks: "",
    studentId: "2021-CSE-041",
    studentName: "Rafi Sikder",
    submittedAt: "2026-07-20",
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role: "student" | "admin" }
  const [complaints, setComplaints] = useState(initialComplaints);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const addComplaint = (complaint) => {
    const newId = `HC-${1000 + complaints.length + 1}`;
    setComplaints((prev) => [
      {
        ...complaint,
        id: newId,
        status: "Submitted",
        remarks: "",
        studentId: user?.id,
        studentName: user?.name,
        submittedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const updateComplaintStatus = (id, status, remarks) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, remarks } : c))
    );
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, complaints, addComplaint, updateComplaintStatus }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
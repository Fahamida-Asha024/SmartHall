/* ------------------------------------------------------------------
   HallMate — Mock Student Data (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Stand-in for real API responses. Every student page imports from
   here for now. Once the backend exists, replace these exports with
   real fetch/axios calls (e.g. inside hooks/useComplaints.js) and
   the pages that consume them won't need to change much.
------------------------------------------------------------------- */

// ---------------- Logged-in student ----------------
export const mockStudent = {
  id: "STU-1001",
  studentId: "2022331120",
  fullName: "Rafiul Islam",
  email: "rafiul@student.hallmate.edu",
  phone: "01712345678",
  department: "Computer Science & Engineering",
  session: "2022-2023",
  hall: "Shaheed Zia Hall",
  room: "304",
  seat: "B",
  profilePicture: null, // will hold an image URL later
  accountStatus: "Active",
  emailVerified: true,
};

// ---------------- Complaint categories ----------------
export const complaintCategories = [
  "Electrical",
  "Plumbing",
  "Internet",
  "Cleaning",
  "Furniture",
  "Dining",
  "Security",
  "Environment",
  "Other",
];

// ---------------- Complaint statuses & priorities ----------------
export const complaintStatuses = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
  "Closed",
  "Reopened",
];

export const complaintPriorities = ["Low", "Medium", "High", "Emergency"];

// ---------------- Sample complaints ----------------
export const mockComplaints = [
  {
    id: "CMP-2026-00421",
    title: "Ceiling fan making loud noise",
    category: "Electrical",
    description: "The ceiling fan in my room has been making a grinding noise for the past two days.",
    location: "Room 304",
    priority: "High",
    status: "In Progress",
    submittedAt: "2026-08-20T09:30:00",
    updatedAt: "2026-08-24T14:10:00",
    images: [],
    assignedWorker: "Karim Uddin",
    workOrderId: "WO-2026-00421",
    comments: [
      { author: "Rafiul Islam", role: "Student", message: "The fan is still making noise after the last check.", timestamp: "2026-08-22T10:00:00" },
      { author: "Admin Office", role: "Admin", message: "We've assigned another inspection for tomorrow.", timestamp: "2026-08-22T11:15:00" },
    ],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-20T09:30:00" },
      { event: "Complaint reviewed", user: "Admin Office", timestamp: "2026-08-20T15:00:00" },
      { event: "Maintenance worker assigned", user: "Admin Office", timestamp: "2026-08-21T09:00:00" },
      { event: "Work started", user: "Karim Uddin", timestamp: "2026-08-21T13:00:00" },
    ],
  },
  {
    id: "CMP-2026-00398",
    title: "Water leakage under sink",
    category: "Plumbing",
    description: "There is a slow water leak under the bathroom sink, causing water to pool on the floor.",
    location: "Room 304, Bathroom",
    priority: "Medium",
    status: "Assigned",
    submittedAt: "2026-08-18T08:00:00",
    updatedAt: "2026-08-19T10:30:00",
    images: [],
    assignedWorker: "Sokal Mia",
    workOrderId: "WO-2026-00398",
    comments: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-18T08:00:00" },
      { event: "Complaint reviewed", user: "Admin Office", timestamp: "2026-08-18T16:00:00" },
      { event: "Maintenance worker assigned", user: "Admin Office", timestamp: "2026-08-19T10:30:00" },
    ],
  },
  {
    id: "CMP-2026-00355",
    title: "Wi-Fi not working in hallway",
    category: "Internet",
    description: "Wi-Fi signal is very weak on the 3rd floor hallway since last week.",
    location: "3rd Floor Hallway",
    priority: "Low",
    status: "Under Review",
    submittedAt: "2026-08-15T18:20:00",
    updatedAt: "2026-08-16T09:00:00",
    images: [],
    assignedWorker: null,
    workOrderId: null,
    comments: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-15T18:20:00" },
      { event: "Complaint reviewed", user: "Admin Office", timestamp: "2026-08-16T09:00:00" },
    ],
  },
  {
    id: "CMP-2026-00312",
    title: "Broken chair in study room",
    category: "Furniture",
    description: "One of the study chairs has a broken leg and is unsafe to use.",
    location: "Common Study Room",
    priority: "Low",
    status: "Resolved",
    submittedAt: "2026-08-05T12:00:00",
    updatedAt: "2026-08-10T11:00:00",
    images: [],
    assignedWorker: "Karim Uddin",
    workOrderId: "WO-2026-00312",
    comments: [
      { author: "Karim Uddin", role: "Maintenance Worker", message: "Chair has been replaced with a new one.", timestamp: "2026-08-10T11:00:00" },
    ],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-05T12:00:00" },
      { event: "Complaint reviewed", user: "Admin Office", timestamp: "2026-08-05T15:00:00" },
      { event: "Maintenance worker assigned", user: "Admin Office", timestamp: "2026-08-06T09:00:00" },
      { event: "Work completed", user: "Karim Uddin", timestamp: "2026-08-10T10:30:00" },
      { event: "Admin verified work", user: "Admin Office", timestamp: "2026-08-10T10:45:00" },
      { event: "Complaint marked resolved", user: "Admin Office", timestamp: "2026-08-10T11:00:00" },
    ],
  },
  {
    id: "CMP-2026-00290",
    title: "Room light flickering",
    category: "Electrical",
    description: "The main light in my room flickers on and off randomly.",
    location: "Room 304",
    priority: "Medium",
    status: "Closed",
    submittedAt: "2026-07-28T20:00:00",
    updatedAt: "2026-08-02T09:00:00",
    images: [],
    assignedWorker: "Karim Uddin",
    workOrderId: "WO-2026-00290",
    comments: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-07-28T20:00:00" },
      { event: "Complaint marked resolved", user: "Admin Office", timestamp: "2026-08-01T10:00:00" },
      { event: "Student confirmed resolution", user: "Rafiul Islam", timestamp: "2026-08-02T09:00:00" },
      { event: "Complaint closed", user: "System", timestamp: "2026-08-02T09:00:00" },
    ],
  },
  {
    id: "CMP-2026-00265",
    title: "AC not cooling properly",
    category: "Electrical",
    description: "The air conditioner runs but doesn't cool the room anymore.",
    location: "Room 304",
    priority: "High",
    status: "Reopened",
    submittedAt: "2026-07-20T10:00:00",
    updatedAt: "2026-08-12T08:00:00",
    images: [],
    assignedWorker: "Sokal Mia",
    workOrderId: "WO-2026-00265",
    comments: [
      { author: "Rafiul Islam", role: "Student", message: "Still not cooling properly after the repair.", timestamp: "2026-08-12T08:00:00" },
    ],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-07-20T10:00:00" },
      { event: "Complaint marked resolved", user: "Admin Office", timestamp: "2026-08-05T10:00:00" },
      { event: "Complaint reopened", user: "Rafiul Islam", timestamp: "2026-08-12T08:00:00" },
    ],
  },
];

// ---------------- Sample notifications ----------------
export const mockNotifications = [
  {
    id: "NOTIF-01",
    title: "Complaint Assigned",
    message: "Your complaint CMP-2026-00421 has been assigned to a maintenance worker.",
    relatedComplaintId: "CMP-2026-00421",
    timestamp: "2026-08-21T09:00:00",
    read: false,
  },
  {
    id: "NOTIF-02",
    title: "Complaint Reopened Confirmed",
    message: "Your reopened complaint CMP-2026-00265 has been received by the admin.",
    relatedComplaintId: "CMP-2026-00265",
    timestamp: "2026-08-12T08:05:00",
    read: false,
  },
  {
    id: "NOTIF-03",
    title: "Complaint Resolved",
    message: "Your complaint CMP-2026-00312 has been marked as resolved. Please confirm.",
    relatedComplaintId: "CMP-2026-00312",
    timestamp: "2026-08-10T11:00:00",
    read: true,
  },
  {
    id: "NOTIF-04",
    title: "Admin Responded",
    message: "Admin Office replied to your comment on CMP-2026-00421.",
    relatedComplaintId: "CMP-2026-00421",
    timestamp: "2026-08-22T11:15:00",
    read: true,
  },
];

// ---------------- Helper: dashboard-style counts ----------------
export function getComplaintCounts(complaints = mockComplaints) {
  return {
    total: complaints.length,
    pending: complaints.filter((c) => ["Submitted", "Under Review"].includes(c.status)).length,
    inProgress: complaints.filter((c) => ["Assigned", "In Progress"].includes(c.status)).length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    closed: complaints.filter((c) => c.status === "Closed").length,
    reopened: complaints.filter((c) => c.status === "Reopened").length,
  };
}
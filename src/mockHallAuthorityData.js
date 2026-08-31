/* ------------------------------------------------------------------
   HallMate — Mock Hall Authority Data (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Everything here is scoped to ONE hall (Shaheed Zia Hall), matching
   the requirement that a Hall Authority never sees other halls' data.
   Swap for real scoped API calls once the backend exists.
------------------------------------------------------------------- */

// ---------------- Logged-in Hall Authority ----------------
export const mockHallAuthority = {
  id: "USR-2001",
  fullName: "Dr. Kamal Hossain",
  email: "kamal.authority@hallmate.edu",
  phone: "01711000001",
  designation: "Provost",
  hall: "Shaheed Zia Hall",
  profilePicture: null,
};

export const COMPLAINT_CATEGORIES = [
  "Electrical", "Plumbing", "Furniture", "Internet",
  "Cleaning", "Dining", "Security", "Environment", "Other",
];

export const COMPLAINT_PRIORITIES = ["Low", "Medium", "High", "Critical"];

// New → Under Review → Assigned → In Progress → Completed → Resolved
// (+ Rejected, Reopened as side branches)
export const COMPLAINT_STATUSES = [
  "New", "Under Review", "Assigned", "In Progress",
  "Completed", "Resolved", "Rejected", "Reopened",
];

export const WORK_ORDER_STATUSES = ["Assigned", "Accepted", "In Progress", "On Hold", "Completed"];

// ---------------- Maintenance Staff pool ----------------
export const mockMaintenanceStaffList = [
  { id: "USR-3001", fullName: "Karim Uddin", specialty: "Electrical & General Repairs", phone: "01755000111", availability: "Available", activeAssignments: 1 },
  { id: "USR-3002", fullName: "Sokal Mia", specialty: "Plumbing", phone: "01755000222", availability: "Available", activeAssignments: 1 },
  { id: "USR-3003", fullName: "Rahim Molla", specialty: "Plumbing & Furniture", phone: "01755000333", availability: "Available", activeAssignments: 2 },
  { id: "USR-3004", fullName: "Jamal Sheikh", specialty: "Electrical", phone: "01755000444", availability: "Busy", activeAssignments: 3 },
  { id: "USR-3005", fullName: "Anwar Ali", specialty: "Furniture & Carpentry", phone: "01755000555", availability: "On Leave", activeAssignments: 0 },
];

// ---------------- Complaints (this hall only) ----------------
export const mockHallComplaints = [
  {
    id: "CMP-2026-00530", title: "Wi-Fi router not working", category: "Internet",
    description: "The floor router has been offline since last night, whole 3rd floor has no internet.",
    location: "3rd Floor Corridor", priority: "Medium", status: "New",
    submittedAt: "2026-08-31T07:20:00", updatedAt: "2026-08-31T07:20:00",
    studentName: "Nafis Karim", studentId: "2023331098", studentRoom: "Room 301",
    images: [], comments: [], internalNotes: [],
    history: [{ event: "Complaint submitted", user: "Nafis Karim", timestamp: "2026-08-31T07:20:00" }],
    rejectionReason: null, workOrderId: null, assignedStaffId: null, assignedStaffName: null, expectedCompletion: null,
  },
  {
    id: "CMP-2026-00512", title: "Bathroom water tap is damaged", category: "Plumbing",
    description: "The tap in the shared bathroom on the 2nd floor is leaking heavily and won't shut off.",
    location: "2nd Floor Bathroom", priority: "High", status: "Under Review",
    submittedAt: "2026-08-30T08:15:00", updatedAt: "2026-08-30T09:00:00",
    studentName: "Tanvir Ahmed", studentId: "2022331050", studentRoom: "Room 212",
    images: [], comments: [],
    internalNotes: [{ author: "Dr. Kamal Hossain", note: "Confirmed with floor prefect, needs urgent attention.", timestamp: "2026-08-30T09:00:00" }],
    history: [
      { event: "Complaint submitted", user: "Tanvir Ahmed", timestamp: "2026-08-30T08:15:00" },
      { event: "Complaint reviewed", user: "Dr. Kamal Hossain", timestamp: "2026-08-30T09:00:00" },
    ],
    rejectionReason: null, workOrderId: null, assignedStaffId: null, assignedStaffName: null, expectedCompletion: null,
  },
  {
    id: "CMP-2026-00470", title: "Study room chair leg broken", category: "Furniture",
    description: "One of the chairs in the common study room has a broken leg and is unsafe to use.",
    location: "Common Study Room", priority: "Low", status: "Under Review",
    submittedAt: "2026-08-29T13:40:00", updatedAt: "2026-08-29T15:00:00",
    studentName: "Mahin Chowdhury", studentId: "2023331021", studentRoom: "Room 108",
    images: [], comments: [], internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Mahin Chowdhury", timestamp: "2026-08-29T13:40:00" },
      { event: "Complaint reviewed", user: "Dr. Kamal Hossain", timestamp: "2026-08-29T15:00:00" },
    ],
    rejectionReason: null, workOrderId: null, assignedStaffId: null, assignedStaffName: null, expectedCompletion: null,
  },
  {
    id: "CMP-2026-00398", title: "Water leakage under bathroom sink", category: "Plumbing",
    description: "Slow water leak under the bathroom sink, causing water to pool on the floor.",
    location: "Room 304, Bathroom", priority: "Medium", status: "Assigned",
    submittedAt: "2026-08-27T10:00:00", updatedAt: "2026-08-28T10:00:00",
    studentName: "Rafiul Islam", studentId: "2022331120", studentRoom: "Room 304",
    images: [], comments: [], internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-27T10:00:00" },
      { event: "Complaint reviewed", user: "Dr. Kamal Hossain", timestamp: "2026-08-27T16:00:00" },
      { event: "Maintenance staff assigned", user: "Dr. Kamal Hossain", timestamp: "2026-08-28T10:00:00" },
    ],
    rejectionReason: null, workOrderId: "WO-2026-00398", assignedStaffId: "USR-3002", assignedStaffName: "Sokal Mia",
    expectedCompletion: "2026-09-02T18:00:00",
  },
  {
    id: "CMP-2026-00421", title: "Ceiling fan making loud noise", category: "Electrical",
    description: "The ceiling fan has been making a grinding noise for the past two days.",
    location: "Room 304", priority: "High", status: "In Progress",
    submittedAt: "2026-08-20T09:30:00", updatedAt: "2026-08-24T14:10:00",
    studentName: "Rafiul Islam", studentId: "2022331120", studentRoom: "Room 304",
    images: [],
    comments: [{ author: "Rafiul Islam", role: "Student", message: "Still making noise after the last check.", timestamp: "2026-08-22T10:00:00" }],
    internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-20T09:30:00" },
      { event: "Complaint reviewed", user: "Dr. Kamal Hossain", timestamp: "2026-08-20T15:00:00" },
      { event: "Maintenance staff assigned", user: "Dr. Kamal Hossain", timestamp: "2026-08-21T09:00:00" },
      { event: "Work started", user: "Karim Uddin", timestamp: "2026-08-21T13:00:00" },
    ],
    rejectionReason: null, workOrderId: "WO-2026-00421", assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    expectedCompletion: "2026-08-30T18:00:00",
  },
  {
    id: "CMP-2026-00312", title: "Broken chair in study room", category: "Furniture",
    description: "One of the study chairs has a broken leg and is unsafe to use.",
    location: "Common Study Room", priority: "Low", status: "Completed",
    submittedAt: "2026-08-05T12:00:00", updatedAt: "2026-08-10T10:30:00",
    studentName: "Rafiul Islam", studentId: "2022331120", studentRoom: "Room 304",
    images: [], comments: [], internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-08-05T12:00:00" },
      { event: "Maintenance staff assigned", user: "Dr. Kamal Hossain", timestamp: "2026-08-06T09:00:00" },
      { event: "Work marked completed", user: "Karim Uddin", timestamp: "2026-08-10T10:30:00" },
    ],
    rejectionReason: null, workOrderId: "WO-2026-00312", assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    expectedCompletion: "2026-08-10T18:00:00",
  },
  {
    id: "CMP-2026-00290", title: "Room light flickering", category: "Electrical",
    description: "The main light in my room flickers on and off randomly.",
    location: "Room 210", priority: "Medium", status: "Resolved",
    submittedAt: "2026-07-28T20:00:00", updatedAt: "2026-08-02T09:00:00",
    studentName: "Farhan Kabir", studentId: "2022331077", studentRoom: "Room 210",
    images: [], comments: [], internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Farhan Kabir", timestamp: "2026-07-28T20:00:00" },
      { event: "Work marked completed", user: "Karim Uddin", timestamp: "2026-08-01T10:00:00" },
      { event: "Completion verified — marked resolved", user: "Dr. Kamal Hossain", timestamp: "2026-08-02T09:00:00" },
    ],
    rejectionReason: null, workOrderId: "WO-2026-00290", assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    expectedCompletion: "2026-08-01T18:00:00",
  },
  {
    id: "CMP-2026-00265", title: "AC not cooling properly", category: "Electrical",
    description: "The air conditioner runs but doesn't cool the room anymore after the last repair.",
    location: "Room 304", priority: "High", status: "Reopened",
    submittedAt: "2026-07-20T10:00:00", updatedAt: "2026-08-12T08:00:00",
    studentName: "Rafiul Islam", studentId: "2022331120", studentRoom: "Room 304",
    images: [],
    comments: [{ author: "Rafiul Islam", role: "Student", message: "Still not cooling properly after the repair.", timestamp: "2026-08-12T08:00:00" }],
    internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Rafiul Islam", timestamp: "2026-07-20T10:00:00" },
      { event: "Marked resolved", user: "Dr. Kamal Hossain", timestamp: "2026-08-05T10:00:00" },
      { event: "Complaint reopened by student", user: "Rafiul Islam", timestamp: "2026-08-12T08:00:00" },
    ],
    rejectionReason: null, workOrderId: "WO-2026-00265", assignedStaffId: "USR-3004", assignedStaffName: "Jamal Sheikh",
    expectedCompletion: "2026-08-15T18:00:00",
  },
  {
    id: "CMP-2026-00255", title: "Request to repaint corridor wall", category: "Other",
    description: "The 1st floor corridor wall paint is peeling badly, requesting repaint.",
    location: "1st Floor Corridor", priority: "Low", status: "Rejected",
    submittedAt: "2026-07-18T11:00:00", updatedAt: "2026-07-19T09:00:00",
    studentName: "Imran Hossain", studentId: "2021331033", studentRoom: "Room 115",
    images: [], comments: [], internalNotes: [],
    history: [
      { event: "Complaint submitted", user: "Imran Hossain", timestamp: "2026-07-18T11:00:00" },
      { event: "Complaint rejected", user: "Dr. Kamal Hossain", timestamp: "2026-07-19T09:00:00" },
    ],
    rejectionReason: "Cosmetic repainting is scheduled hall-wide next semester, not an individual maintenance case.",
    workOrderId: null, assignedStaffId: null, assignedStaffName: null, expectedCompletion: null,
  },
];

// ---------------- Work Orders (this hall only) ----------------
export const mockHallWorkOrders = [
  {
    id: "WO-2026-00398", complaintId: "CMP-2026-00398", title: "Fix water leakage under bathroom sink",
    category: "Plumbing", location: "Room 304, Bathroom", priority: "Medium", status: "Assigned",
    assignedStaffId: "USR-3002", assignedStaffName: "Sokal Mia",
    instructions: "Slow leak reported, check pipe joint under sink.",
    assignedDate: "2026-08-28T10:00:00", expectedCompletion: "2026-09-02T18:00:00", completedDate: null,
    acceptedByWorker: false, completionNotes: "", completionPhotos: [], verification: null,
  },
  {
    id: "WO-2026-00421", complaintId: "CMP-2026-00421", title: "Repair ceiling fan in Room 304",
    category: "Electrical", location: "Room 304", priority: "High", status: "In Progress",
    assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    instructions: "Student reports grinding noise. Check capacitor and bearings first.",
    assignedDate: "2026-08-21T09:00:00", expectedCompletion: "2026-08-30T18:00:00", completedDate: null,
    acceptedByWorker: true, completionNotes: "", completionPhotos: [], verification: null,
  },
  {
    id: "WO-2026-00312", complaintId: "CMP-2026-00312", title: "Replace broken study room chair",
    category: "Furniture", location: "Common Study Room", priority: "Low", status: "Completed",
    assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    instructions: "Chair leg is broken, replace with spare unit.",
    assignedDate: "2026-08-06T09:00:00", expectedCompletion: "2026-08-10T18:00:00", completedDate: "2026-08-10T10:30:00",
    acceptedByWorker: true,
    completionNotes: "Confirmed broken leg on arrival, replaced with a new chair from storage. Old one disposed of.",
    completionPhotos: [], verification: "Pending",
  },
  {
    id: "WO-2026-00290", complaintId: "CMP-2026-00290", title: "Fix flickering light in Room 210",
    category: "Electrical", location: "Room 210", priority: "Medium", status: "Completed",
    assignedStaffId: "USR-3001", assignedStaffName: "Karim Uddin",
    instructions: "Check wiring connection at the switchboard.",
    assignedDate: "2026-07-29T09:00:00", expectedCompletion: "2026-08-01T18:00:00", completedDate: "2026-08-01T10:00:00",
    acceptedByWorker: true,
    completionNotes: "Loose wire at the switchboard reconnected and tested.",
    completionPhotos: [], verification: "Approved",
  },
  {
    id: "WO-2026-00265", complaintId: "CMP-2026-00265", title: "AC not cooling — re-inspect",
    category: "Electrical", location: "Room 304", priority: "High", status: "On Hold",
    assignedStaffId: "USR-3004", assignedStaffName: "Jamal Sheikh",
    instructions: "Complaint reopened — previous repair didn't fix the issue. Needs specialist part.",
    assignedDate: "2026-08-12T09:00:00", expectedCompletion: "2026-08-15T18:00:00", completedDate: null,
    acceptedByWorker: true, completionNotes: "Waiting on replacement compressor part from store.",
    completionPhotos: [], verification: null,
  },
];

// ---------------- Notifications ----------------
export const mockHallNotifications = [
  { id: "HNOTIF-01", type: "newComplaint", title: "New Complaint Submitted", message: "Nafis Karim submitted CMP-2026-00530: Wi-Fi router not working.", relatedComplaintId: "CMP-2026-00530", timestamp: "2026-08-31T07:20:00", read: false },
  { id: "HNOTIF-02", type: "highPriority", title: "High-Priority Complaint", message: "CMP-2026-00512 (Bathroom tap damaged) was submitted with High priority.", relatedComplaintId: "CMP-2026-00512", timestamp: "2026-08-30T08:15:00", read: false },
  { id: "HNOTIF-03", type: "verification", title: "Completion Needs Verification", message: "Karim Uddin marked WO-2026-00312 as completed. Please verify.", relatedWorkOrderId: "WO-2026-00312", timestamp: "2026-08-10T10:30:00", read: false },
  { id: "HNOTIF-04", type: "onHold", title: "Task Put On Hold", message: "Jamal Sheikh put WO-2026-00265 on hold — waiting on a spare part.", relatedWorkOrderId: "WO-2026-00265", timestamp: "2026-08-12T09:05:00", read: true },
  { id: "HNOTIF-05", type: "reopened", title: "Complaint Reopened", message: "Rafiul Islam reopened CMP-2026-00265 — AC still not cooling.", relatedComplaintId: "CMP-2026-00265", timestamp: "2026-08-12T08:00:00", read: true },
  { id: "HNOTIF-06", type: "accepted", title: "Task Accepted", message: "Karim Uddin accepted WO-2026-00421.", relatedWorkOrderId: "WO-2026-00421", timestamp: "2026-08-21T10:00:00", read: true },
  { id: "HNOTIF-07", type: "overdue", title: "Task Overdue", message: "WO-2026-00265 has passed its expected completion date.", relatedWorkOrderId: "WO-2026-00265", timestamp: "2026-08-16T08:00:00", read: true },
];

// ---------------- Reports (hall-specific only) ----------------
export const mockHallComplaintsByCategory = [
  { category: "Electrical", count: 12 }, { category: "Plumbing", count: 8 },
  { category: "Furniture", count: 5 }, { category: "Internet", count: 4 },
  { category: "Cleaning", count: 3 }, { category: "Other", count: 2 },
];

export const mockHallComplaintsByPriority = [
  { priority: "Low", count: 9 }, { priority: "Medium", count: 14 },
  { priority: "High", count: 8 }, { priority: "Critical", count: 3 },
];

export const mockHallComplaintsOverTime = [
  { month: "Mar", submitted: 5, resolved: 4 }, { month: "Apr", submitted: 7, resolved: 6 },
  { month: "May", submitted: 6, resolved: 5 }, { month: "Jun", submitted: 4, resolved: 4 },
  { month: "Jul", submitted: 8, resolved: 6 }, { month: "Aug", submitted: 9, resolved: 5 },
];

export const mockHallResolutionStats = { resolutionRate: 74, avgResolutionTimeDays: 2.8, overdueRate: 11 };

export const mockStaffWorkload = mockMaintenanceStaffList.map((s) => ({ name: s.fullName, active: s.activeAssignments }));

// ---------------- Helpers ----------------
export function isOverdue(item) {
  if (!item.expectedCompletion) return false;
  if (["Completed", "Resolved"].includes(item.status)) return false;
  return new Date(item.expectedCompletion) < new Date();
}

export function getDashboardStats(complaints = mockHallComplaints, workOrders = mockHallWorkOrders) {
  return {
    total: complaints.length,
    new: complaints.filter((c) => c.status === "New").length,
    pending: complaints.filter((c) => ["New", "Under Review"].includes(c.status)).length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    completed: complaints.filter((c) => ["Completed", "Resolved"].includes(c.status)).length,
    overdue: workOrders.filter(isOverdue).length,
    highPriority: complaints.filter((c) => ["High", "Critical"].includes(c.priority) && !["Resolved", "Rejected"].includes(c.status)).length,
  };
}

export function getHallComplaintCounts(complaints = mockHallComplaints) {
  return {
    total: complaints.length,
    awaitingAssignment: complaints.filter((c) => ["Under Review"].includes(c.status)).length,
    assigned: complaints.filter((c) => !!c.assignedStaffId).length,
  };
}
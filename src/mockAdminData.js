/* ------------------------------------------------------------------
   HallMate — Mock Admin Data (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Separate from mockStudentData.js since Admin operates system-wide
   across all roles/halls, not from a single student's perspective.
   Swap these exports for real API calls once the backend exists.
------------------------------------------------------------------- */

// ---------------- Logged-in admin ----------------
export const mockAdmin = {
  id: "ADM-001",
  fullName: "Nusrat Jahan",
  email: "nusrat.admin@hallmate.edu",
  phone: "01711000000",
  designation: "System Administrator",
  role: "Admin",
  accountStatus: "Active",
  profilePicture: null,
};

// ---------------- Halls (needed since each Hall Authority = 1 hall) ----------------
export const mockHalls = [
  "Shaheed Zia Hall",
  "Begum Rokeya Hall",
  "Bangabandhu Hall",
  "Sultana Kamal Hall",
];

// ---------------- Users (all roles in one table) ----------------
export const mockUsers = [
  {
    id: "USR-1001",
    fullName: "Rafiul Islam",
    email: "rafiul@student.hallmate.edu",
    role: "Student",
    hall: "Shaheed Zia Hall",
    status: "Active",
    createdAt: "2024-01-15T09:00:00",
    lastActive: "2026-08-29T14:20:00",
  },
  {
    id: "USR-1002",
    fullName: "Raisa Rahman",
    email: "raisa.cse@sust.edu",
    role: "Student",
    hall: "Begum Rokeya Hall",
    status: "Active",
    createdAt: "2024-02-10T09:00:00",
    lastActive: "2026-08-30T10:35:00",
  },
  {
    id: "USR-2001",
    fullName: "Dr. Kamal Hossain",
    email: "kamal.authority@hallmate.edu",
    role: "Hall Authority",
    hall: "Shaheed Zia Hall",
    status: "Active",
    createdAt: "2023-07-01T09:00:00",
    lastActive: "2026-08-30T09:10:00",
  },
  {
    id: "USR-2002",
    fullName: "Dr. Farida Yasmin",
    email: "farida.authority@hallmate.edu",
    role: "Hall Authority",
    hall: "Begum Rokeya Hall",
    status: "Active",
    createdAt: "2023-08-15T09:00:00",
    lastActive: "2026-08-29T16:45:00",
  },
  {
    id: "USR-2003",
    fullName: "Prof. Anwar Sadat",
    email: "anwar.authority@hallmate.edu",
    role: "Hall Authority",
    hall: "Bangabandhu Hall",
    status: "Inactive",
    createdAt: "2023-05-20T09:00:00",
    lastActive: "2026-06-01T11:00:00",
  },
  {
    id: "USR-3001",
    fullName: "Karim Uddin",
    email: "karim.maintenance@hallmate.edu",
    role: "Maintenance Staff",
    hall: null,
    status: "Active",
    createdAt: "2023-03-01T09:00:00",
    lastActive: "2026-08-30T08:00:00",
  },
  {
    id: "USR-3002",
    fullName: "Sokal Mia",
    email: "sokal.maintenance@hallmate.edu",
    role: "Maintenance Staff",
    hall: null,
    status: "Active",
    createdAt: "2023-04-12T09:00:00",
    lastActive: "2026-08-29T18:30:00",
  },
  {
    id: "ADM-001",
    fullName: "Nusrat Jahan",
    email: "nusrat.admin@hallmate.edu",
    role: "Admin",
    hall: null,
    status: "Active",
    createdAt: "2022-01-01T09:00:00",
    lastActive: "2026-08-30T16:00:00",
  },
];

// ---------------- Role → Permissions map ----------------
export const mockRolePermissions = {
  Student: [
    "Submit complaints",
    "View own complaints",
    "Track complaint status",
    "Comment/reply where allowed",
    "Reopen eligible complaints",
  ],
  "Hall Authority": [
    "View complaints",
    "Review complaints",
    "Set/change complaint priority",
    "Assign work orders",
    "Assign maintenance staff",
    "Change complaint status",
    "Manage work orders",
    "Verify completed work",
    "Generate operational reports",
  ],
  "Maintenance Staff": [
    "View assigned work",
    "Accept/reject assigned work where applicable",
    "Start work",
    "Update work progress",
    "Put work on hold/resume",
    "Complete work",
    "Upload completion evidence/photos",
  ],
  Admin: [
    "Manage users",
    "Manage roles and permissions",
    "Manage complaint categories",
    "Manage complaint priorities",
    "Manage complaint statuses",
    "Manage system settings",
    "View system-wide reports",
    "View audit logs",
    "Configure notifications",
    "Manage Hall Authority and Maintenance Staff accounts",
  ],
};

// ---------------- Complaint categories (admin-configurable) ----------------
export const mockCategories = [
  { id: "CAT-01", name: "Room & Furniture", description: "Furniture damage, room fixtures", active: true },
  { id: "CAT-02", name: "Electrical", description: "Fans, lights, sockets, wiring", active: true },
  { id: "CAT-03", name: "Plumbing", description: "Leaks, taps, drainage", active: true },
  { id: "CAT-04", name: "Internet", description: "Wi-Fi and network connectivity", active: true },
  { id: "CAT-05", name: "Cleaning", description: "Housekeeping and sanitation", active: true },
  { id: "CAT-06", name: "Dining", description: "Dining hall related issues", active: true },
  { id: "CAT-07", name: "Security", description: "Safety and security concerns", active: true },
  { id: "CAT-08", name: "Environment", description: "Pest control, ventilation, cleanliness of surroundings", active: true },
  { id: "CAT-09", name: "Administration", description: "Administrative/paperwork issues", active: false },
];

// ---------------- Priority levels (admin-configurable) ----------------
export const mockPriorityLevels = [
  { id: "PR-01", name: "Low", description: "No urgency, can be scheduled normally", active: true },
  { id: "PR-02", name: "Medium", description: "Should be addressed within a few days", active: true },
  { id: "PR-03", name: "High", description: "Needs prompt attention within 24-48 hours", active: true },
  { id: "PR-04", name: "Critical", description: "Immediate safety or habitability concern", active: true },
];

// ---------------- Complaint statuses (admin-configurable) ----------------
export const mockComplaintStatusesConfig = [
  { id: "ST-01", name: "Pending", active: true },
  { id: "ST-02", name: "Assigned", active: true },
  { id: "ST-03", name: "In Progress", active: true },
  { id: "ST-04", name: "Resolved", active: true },
  { id: "ST-05", name: "Closed", active: true },
  { id: "ST-06", name: "Reopened", active: true },
  { id: "ST-07", name: "Rejected", active: true },
];
// Add to mockAdminData.js

export const mockComplaintsByCategory = [
  { category: "Electrical", count: 38 },
  { category: "Plumbing", count: 24 },
  { category: "Internet", count: 19 },
  { category: "Furniture", count: 15 },
  { category: "Cleaning", count: 12 },
  { category: "Security", count: 8 },
  { category: "Dining", count: 7 },
  { category: "Environment", count: 5 },
];

export const mockComplaintsByPriority = [
  { priority: "Low", count: 41 },
  { priority: "Medium", count: 58 },
  { priority: "High", count: 37 },
  { priority: "Critical", count: 12 },
];

export const mockComplaintsOverTime = [
  { month: "Mar", submitted: 14, resolved: 10 },
  { month: "Apr", submitted: 19, resolved: 15 },
  { month: "May", submitted: 22, resolved: 20 },
  { month: "Jun", submitted: 17, resolved: 16 },
  { month: "Jul", submitted: 25, resolved: 21 },
  { month: "Aug", submitted: 28, resolved: 23 },
];

export const mockResolutionStats = {
  resolutionRate: 79,
  avgResolutionTimeDays: 2.4,
  reopenedRate: 6,
  overdueRate: 9,
};
// ---------------- Audit log ----------------
export const mockAuditLog = [
  {
    id: "LOG-001",
    timestamp: "2026-08-30T09:10:00",
    user: "Dr. Kamal Hossain",
    role: "Hall Authority",
    action: "Complaint Assigned",
    entityId: "CMP-2026-00421",
    description: "Assigned complaint CMP-2026-00421 to Karim Uddin",
  },
  {
    id: "LOG-002",
    timestamp: "2026-08-29T16:45:00",
    user: "Dr. Farida Yasmin",
    role: "Hall Authority",
    action: "Status Changed",
    entityId: "CMP-2026-00398",
    description: "Changed status from Pending to Assigned",
  },
  {
    id: "LOG-003",
    timestamp: "2026-08-29T14:20:00",
    user: "Rafiul Islam",
    role: "Student",
    action: "Complaint Submitted",
    entityId: "CMP-2026-00421",
    description: "Submitted new complaint: Ceiling fan making loud noise",
  },
  {
    id: "LOG-004",
    timestamp: "2026-08-28T11:00:00",
    user: "Nusrat Jahan",
    role: "Admin",
    action: "User Deactivated",
    entityId: "USR-2003",
    description: "Deactivated account for Prof. Anwar Sadat",
  },
  {
    id: "LOG-005",
    timestamp: "2026-08-27T10:00:00",
    user: "Nusrat Jahan",
    role: "Admin",
    action: "Category Updated",
    entityId: "CAT-09",
    description: "Deactivated category: Administration",
  },
];

// ---------------- Notification settings ----------------
export const mockNotificationSettings = [
  { key: "complaint_submitted", label: "New complaint submitted", enabled: true },
  { key: "complaint_assigned", label: "Complaint assigned", enabled: true },
  { key: "work_assigned", label: "Work assigned", enabled: true },
  { key: "work_accepted", label: "Work accepted", enabled: true },
  { key: "work_completed", label: "Work completed", enabled: true },
  { key: "complaint_resolved", label: "Complaint resolved", enabled: true },
  { key: "complaint_closed", label: "Complaint closed", enabled: false },
  { key: "complaint_reopened", label: "Complaint reopened", enabled: true },
];

// ---------------- Helper: system-wide stats for dashboard ----------------
export function getSystemStats(users = mockUsers) {
  const byRole = (role) => users.filter((u) => u.role === role).length;
  return {
    totalUsers: users.length,
    totalStudents: byRole("Student"),
    totalHallAuthorities: byRole("Hall Authority"),
    totalMaintenanceStaff: byRole("Maintenance Staff"),
    activeUsers: users.filter((u) => u.status === "Active").length,
    inactiveUsers: users.filter((u) => u.status === "Inactive").length,
  };
}

// Mock complaint-wide counts for the dashboard (system-wide, not per-student)
export const mockSystemComplaintCounts = {
  total: 148,
  pending: 22,
  inProgress: 34,
  resolved: 71,
  closed: 15,
  reopened: 6,
};
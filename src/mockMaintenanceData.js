/* ------------------------------------------------------------------
   HallMate — Mock Maintenance Staff Data (FRONTEND-ONLY)
   ------------------------------------------------------------------
   Simple, single-worker perspective — same pattern as
   mockStudentData.js. Swap for real API calls later.
------------------------------------------------------------------- */

export const mockWorker = {
  id: "USR-3001",
  fullName: "Karim Uddin",
  email: "karim.maintenance@hallmate.edu",
  phone: "01755000111",
  specialty: "Electrical & General Repairs",
  profilePicture: null,
};

// Maintenance status is separate from complaint status, per the spec.
export const maintenanceStatuses = ["Assigned", "Accepted", "In Progress", "On Hold", "Completed"];

export const mockWorkOrders = [
  {
    id: "WO-2026-00421",
    complaintId: "CMP-2026-00421",
    title: "Repair ceiling fan in Room 304",
    category: "Electrical",
    location: "Shaheed Zia Hall, Room 304",
    priority: "High",
    status: "In Progress",
    assignedDate: "2026-08-21T09:00:00",
    expectedCompletion: "2026-08-31T18:00:00",
    adminInstructions: "Student reports grinding noise. Check capacitor and bearings first.",
    workerNotes: "",
    completionNotes: "",
    completionPhotos: [],
  },
  {
    id: "WO-2026-00398",
    complaintId: "CMP-2026-00398",
    title: "Fix water leakage under bathroom sink",
    category: "Plumbing",
    location: "Shaheed Zia Hall, Room 304",
    priority: "Medium",
    status: "Assigned",
    assignedDate: "2026-08-30T10:00:00",
    expectedCompletion: "2026-09-02T18:00:00",
    adminInstructions: "Slow leak reported, check pipe joint under sink.",
    workerNotes: "",
    completionNotes: "",
    completionPhotos: [],
  },
  {
    id: "WO-2026-00312",
    complaintId: "CMP-2026-00312",
    title: "Replace broken study room chair",
    category: "Furniture",
    location: "Common Study Room",
    priority: "Low",
    status: "Completed",
    assignedDate: "2026-08-06T09:00:00",
    expectedCompletion: "2026-08-10T18:00:00",
    adminInstructions: "Chair leg is broken, replace with spare unit.",
    workerNotes: "Confirmed broken leg on arrival, no fix possible.",
    completionNotes: "Replaced with a new chair from storage. Old one disposed of.",
    completionPhotos: [],
  },
  {
    id: "WO-2026-00265",
    complaintId: "CMP-2026-00265",
    title: "AC not cooling — re-inspect",
    category: "Electrical",
    location: "Room 304",
    priority: "High",
    status: "On Hold",
    assignedDate: "2026-08-12T09:00:00",
    expectedCompletion: "2026-08-15T18:00:00",
    adminInstructions: "Complaint reopened — previous repair didn't fix the issue. Needs specialist part.",
    workerNotes: "Waiting on replacement compressor part from store.",
    completionNotes: "",
    completionPhotos: [],
  },
];
// Add to mockMaintenanceData.js

export const mockWorkerNotifications = [
  {
    id: "MNOTIF-01",
    title: "New Work Order Assigned",
    message: "You've been assigned WO-2026-00398: Fix water leakage under bathroom sink.",
    workOrderId: "WO-2026-00398",
    timestamp: "2026-08-30T10:00:00",
    read: false,
  },
  {
    id: "MNOTIF-02",
    title: "Priority Changed",
    message: "WO-2026-00421 priority was changed to High by the Hall Authority.",
    workOrderId: "WO-2026-00421",
    timestamp: "2026-08-24T09:00:00",
    read: false,
  },
  {
    id: "MNOTIF-03",
    title: "New Instruction Added",
    message: "Hall Authority added a note to WO-2026-00265: needs specialist part.",
    workOrderId: "WO-2026-00265",
    timestamp: "2026-08-12T09:00:00",
    read: true,
  },
];

export function getWorkOrderCounts(orders = mockWorkOrders) {
  return {
    total: orders.length,
    new: orders.filter((o) => o.status === "Assigned").length,
    accepted: orders.filter((o) => o.status === "Accepted").length,
    inProgress: orders.filter((o) => o.status === "In Progress").length,
    onHold: orders.filter((o) => o.status === "On Hold").length,
    completed: orders.filter((o) => o.status === "Completed").length,
  };
}
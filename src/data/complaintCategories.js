export const complaintCategories = [
  {
    id: "electrical",
    name: "Electrical",
    description: "Problems related to electrical equipment and power.",
    scopes: ["personal", "common"],
    subCategories: [
      "Light not working",
      "Fan not working",
      "Switch problem",
      "Socket problem",
      "Power outage",
      "Short circuit",
      "Other electrical problem",
    ],
  },

  {
    id: "plumbing",
    name: "Plumbing",
    description: "Problems related to water supply, pipes and drainage.",
    scopes: ["personal", "common"],
    subCategories: [
      "Water leakage",
      "Broken tap",
      "Blocked drain",
      "Water pressure problem",
      "Toilet plumbing",
      "Pipe problem",
      "Other plumbing problem",
    ],
  },

  {
    id: "sanitation",
    name: "Sanitation",
    description: "Problems related to cleanliness and sanitation.",
    scopes: ["personal", "common"],
    subCategories: [
      "Dirty bathroom",
      "Blocked toilet",
      "Bad smell",
      "Garbage problem",
      "Drainage problem",
      "Pest problem",
      "Other sanitation problem",
    ],
  },

  {
    id: "furniture",
    name: "Furniture",
    description: "Problems related to room furniture.",
    scopes: ["personal"],
    subCategories: [
      "Broken bed",
      "Broken chair",
      "Broken table",
      "Broken cupboard",
      "Broken shelf",
      "Door problem",
      "Window problem",
      "Other furniture problem",
    ],
  },

  {
    id: "appliance",
    name: "Appliances",
    description: "Problems related to hall-provided appliances.",
    scopes: ["personal", "common"],
    subCategories: [
      "Refrigerator problem",
      "Washing machine problem",
      "Kettle problem",
      "Water purifier problem",
      "Microwave problem",
      "Other appliance problem",
    ],
  },

  {
    id: "internet",
    name: "Internet",
    description: "Problems related to Wi-Fi and internet services.",
    scopes: ["personal", "common"],
    subCategories: [
      "Wi-Fi not working",
      "Slow internet",
      "No connection",
      "Router problem",
      "Network coverage problem",
      "Other internet problem",
    ],
  },

  {
    id: "cleaning",
    name: "Cleaning",
    description: "Problems related to cleaning services.",
    scopes: ["personal", "common"],
    subCategories: [
      "Room not cleaned",
      "Bathroom not cleaned",
      "Corridor not cleaned",
      "Garbage not collected",
      "Cleaning schedule problem",
      "Other cleaning problem",
    ],
  },

  {
    id: "maintenance",
    name: "Maintenance",
    description: "General hall maintenance problems.",
    scopes: ["personal", "common"],
    subCategories: [
      "Wall damage",
      "Ceiling problem",
      "Floor problem",
      "Roof problem",
      "Leakage",
      "Painting problem",
      "Structural damage",
      "Other maintenance problem",
    ],
  },

  {
    id: "security",
    name: "Security",
    description: "Problems related to hall security.",
    scopes: ["personal", "common", "student"],
    subCategories: [
      "Broken lock",
      "Gate problem",
      "Security light problem",
      "CCTV problem",
      "Unauthorized access",
      "Other security problem",
    ],
  },

  {
    id: "dining",
    name: "Dining",
    description: "Problems related to dining services.",
    scopes: ["common"],
    subCategories: [
      "Food quality",
      "Food shortage",
      "Hygiene problem",
      "Dining equipment problem",
      "Meal timing problem",
      "Other dining problem",
    ],
  },

  {
    id: "student_issue",
    name: "Student / Roommate Issue",
    description: "Problems involving students or shared living.",
    scopes: ["student"],
    subCategories: [
      "Roommate conflict",
      "Noise disturbance",
      "Property issue",
      "Harassment / misconduct",
      "Common space conflict",
      "Other student issue",
    ],
  },

  {
    id: "environment",
    name: "Environment",
    description: "Problems related to the hall environment.",
    scopes: ["personal", "common"],
    subCategories: [
      "Excessive heat",
      "Ventilation problem",
      "Bad smell",
      "Mosquito problem",
      "Insect problem",
      "Noise problem",
      "Other environmental problem",
    ],
  },

  {
    id: "other",
    name: "Other",
    description: "For problems that do not fit another category.",
    scopes: ["personal", "common", "student", "admin"],
    subCategories: [
      "Other",
    ],
  },
];


export function getCategoryById(id) {
  return complaintCategories.find(
    (category) => category.id === id
  );
}
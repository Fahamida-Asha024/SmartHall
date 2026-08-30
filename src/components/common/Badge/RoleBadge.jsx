import React from "react";

const RoleBadge = ({ role }) => {
  const styles = {
    Student: "bg-blue-50 text-blue-700",
    "Hall Authority": "bg-purple-50 text-purple-700",
    "Maintenance Staff": "bg-orange-50 text-orange-700",
    Admin: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[role] || "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
import React from "react";

const AccountStatusBadge = ({ status }) => {
  const isActive =
    status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {status}
    </span>
  );
};

export default AccountStatusBadge;
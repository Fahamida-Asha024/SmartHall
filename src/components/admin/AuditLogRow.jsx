import React from "react";
import RoleBadge from "./Badge/RoleBadge";

/* ------------------------------------------------------------------
   Single audit log row. Expects the shape from mockAuditLog:
     { id, timestamp, user, role, action, entityId, description }
------------------------------------------------------------------- */

export default function AuditLogRow({ log }) {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="w-32 shrink-0 text-xs text-slate-400">
        {new Date(log.timestamp).toLocaleString(undefined, {
          month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
        })}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800">{log.action}</p>
        <p className="mt-0.5 text-sm text-slate-500">{log.description}</p>
        {log.entityId && (
          <p className="mt-1 text-xs text-slate-400">Ref: {log.entityId}</p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-medium text-slate-700">{log.user}</p>
        <div className="mt-1"><RoleBadge role={log.role} /></div>
      </div>
    </div>
  );
}